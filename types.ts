
export interface Student {
  student_id: number;
  name: string;
  department: string;
  marks: number;
}

export type MetricType = 'mean' | 'median' | 'mode' | 'variance' | 'standard deviation';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
}

export interface StatisticalResult {
  metric: MetricType;
  value: number;
  dataCount: number;
  department?: string;
}
