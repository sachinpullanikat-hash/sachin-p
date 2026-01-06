
import { GoogleGenAI, Type, FunctionDeclaration } from '@google/genai';
import { databaseService } from './databaseService';
import { formulaService } from './formulaService';
import { MetricType } from '../types';

const fetchMarksByDepartmentDeclaration: FunctionDeclaration = {
  name: 'fetchMarksByDepartment',
  parameters: {
    type: Type.OBJECT,
    description: 'Fetch the numeric marks for all students in a specific department.',
    properties: {
      department: {
        type: Type.STRING,
        description: 'The name of the department (e.g., Computer Science, Mechanical, Electrical, Civil).',
      },
    },
    required: ['department'],
  },
};

const calculateStatisticalMetricDeclaration: FunctionDeclaration = {
  name: 'calculateStatisticalMetric',
  parameters: {
    type: Type.OBJECT,
    description: 'Perform a deterministic statistical calculation on a provided set of numbers.',
    properties: {
      metric: {
        type: Type.STRING,
        description: 'The statistical metric to calculate.',
        enum: ['mean', 'median', 'mode', 'variance', 'standard deviation'],
      },
      data: {
        type: Type.ARRAY,
        items: { type: Type.NUMBER },
        description: 'The list of numeric marks to analyze.',
      },
    },
    required: ['metric', 'data'],
  },
};

const SYSTEM_INSTRUCTION = `
You are a highly capable Statistical Assistant Agent.
Your core mission is to help users compute statistical metrics (mean, median, mode, variance, and standard deviation) based on student mark data.

Operational Rules:
1. NEVER perform math yourself. Always use the 'calculateStatisticalMetric' tool.
2. If a user asks for stats on a department, first use 'fetchMarksByDepartment' to get the data.
3. If the user query is missing a department name or has an ambiguous one, ask for clarification.
4. The available departments are: ${databaseService.getDepartments().join(', ')}.
5. If the user provides their own list of numbers, proceed directly to 'calculateStatisticalMetric'.
6. Respond conversationally, explaining what you found (e.g., "The mean marks for Computer Science students (based on 5 records) is 86.6.").
7. Be polite and helpful.
`;

export class GeminiAgent {
  private ai: any;
  private history: any[] = [];

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async sendMessage(userMessage: string): Promise<string> {
    try {
      // Add user message to history
      this.history.push({
        role: 'user',
        parts: [{ text: userMessage }]
      });

      // Agentic loop to handle multi-step reasoning and tool calls
      while (true) {
        const response = await this.ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: this.history,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            tools: [{
              functionDeclarations: [
                fetchMarksByDepartmentDeclaration,
                calculateStatisticalMetricDeclaration
              ]
            }],
          },
        });

        const candidate = response.candidates[0];
        if (!candidate || !candidate.content) {
          throw new Error("Invalid response from Gemini API");
        }

        // Add the model's response (which might contain function calls) to history
        this.history.push(candidate.content);

        const functionCalls = candidate.content.parts
          .filter((p: any) => p.functionCall)
          .map((p: any) => p.functionCall);

        // If there are no function calls, we have our final response
        if (functionCalls.length === 0) {
          return response.text || "I'm sorry, I couldn't process that request.";
        }

        // Process all function calls in the current turn
        const functionResponses = [];
        for (const call of functionCalls) {
          console.debug(`Agent calling tool: ${call.name}`, call.args);
          let result: any = null;
          
          if (call.name === 'fetchMarksByDepartment') {
            const marks = databaseService.getMarksByDepartment(call.args.department);
            result = { marks };
          } else if (call.name === 'calculateStatisticalMetric') {
            const val = formulaService.calculate(call.args.metric as MetricType, call.args.data);
            result = { value: val };
          }

          functionResponses.push({
            functionResponse: {
              name: call.name,
              id: call.id,
              response: { result }
            }
          });
        }

        // Add tool results to history as a user turn
        this.history.push({
          role: 'user',
          parts: functionResponses
        });

        // Loop continues to let the model process the tool results...
      }
    } catch (error) {
      console.error('Gemini Agent Error:', error);
      return "There was an error communicating with my brain. Please try again.";
    }
  }
}
