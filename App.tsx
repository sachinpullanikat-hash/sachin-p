
import React from 'react';
import ChatInterface from './components/ChatInterface';
import StudentTable from './components/StudentTable';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-600">
            <i className="fa-solid fa-chart-line text-2xl"></i>
            <h1 className="text-xl font-black tracking-tight text-slate-900 uppercase">
              Stat<span className="text-indigo-600">Bot</span>
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Agentic Engine</span>
              <span className="text-[10px] font-medium text-indigo-500 bg-indigo-50 px-1.5 py-0.5 rounded">Gemini 3 Flash</span>
            </div>
            <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 border border-slate-200">
              <i className="fa-solid fa-user"></i>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Chat - Agent Controller */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl p-6 text-white shadow-xl">
              <h2 className="text-2xl font-bold mb-2">Agentic Statistics</h2>
              <p className="text-indigo-100 text-sm leading-relaxed opacity-90">
                Welcome to StatBot. This agent doesn't just predict text—it executes deterministic code. 
                Ask it to analyze department metrics, and watch as it reasons through the data fetch, 
                identifies the tool, and calculates results with zero hallucinations.
              </p>
            </div>
            <ChatInterface />
          </div>

          {/* Right Column: Database and System Info */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-800">System Modules</h2>
                <span className="text-[10px] font-bold text-slate-400 border border-slate-200 rounded px-2 py-0.5">V1.0-PREVIEW</span>
              </div>
              
              {/* Module Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-indigo-300 transition-colors">
                  <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 mb-2">
                    <i className="fa-solid fa-microchip"></i>
                  </div>
                  <h4 className="text-sm font-bold text-slate-800">Gemini LLM</h4>
                  <p className="text-[10px] text-slate-500 mt-1">Reasoning & Tool Selection</p>
                </div>
                <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-indigo-300 transition-colors">
                  <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600 mb-2">
                    <i className="fa-solid fa-calculator"></i>
                  </div>
                  <h4 className="text-sm font-bold text-slate-800">Formula API</h4>
                  <p className="text-[10px] text-slate-500 mt-1">Deterministic Math Logic</p>
                </div>
              </div>

              {/* Data Table */}
              <StudentTable />
              
              {/* Quick Actions / Tips */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <div className="flex gap-3">
                  <i className="fa-solid fa-lightbulb text-amber-500 mt-0.5"></i>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-amber-900">Pro Tip</h4>
                    <p className="text-xs text-amber-800 leading-relaxed">
                      Try multi-step queries like "What is the standard deviation for CS and the mean for Civil students?"
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-400 text-xs font-medium">
            Built with React, Tailwind, and Google Gemini API. Deterministic Statistical Reasoning Engine.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
