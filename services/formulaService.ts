
import { MetricType } from '../types';

export const formulaService = {
  calculate: (metric: MetricType, data: number[]): number => {
    if (!data.length) return 0;
    
    switch (metric.toLowerCase()) {
      case 'mean':
        return data.reduce((a, b) => a + b, 0) / data.length;
        
      case 'median': {
        const sorted = [...data].sort((a, b) => a - b);
        const mid = Math.floor(sorted.length / 2);
        return sorted.length % 2 !== 0 
          ? sorted[mid] 
          : (sorted[mid - 1] + sorted[mid]) / 2;
      }
      
      case 'mode': {
        const counts: Record<number, number> = {};
        data.forEach(x => counts[x] = (counts[x] || 0) + 1);
        let max = 0;
        let modes: number[] = [];
        for (const [val, count] of Object.entries(counts)) {
          if (count > max) {
            max = count;
            modes = [Number(val)];
          } else if (count === max) {
            modes.push(Number(val));
          }
        }
        // If all unique, return mean? No, usually mode is just the highest frequency. 
        // We return the first one for simplicity in this assistant.
        return modes[0];
      }
      
      case 'variance': {
        const mean = data.reduce((a, b) => a + b, 0) / data.length;
        return data.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / data.length;
      }
      
      case 'standard deviation': {
        const mean = data.reduce((a, b) => a + b, 0) / data.length;
        const variance = data.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / data.length;
        return Math.sqrt(variance);
      }
      
      default:
        throw new Error(`Unsupported metric: ${metric}`);
    }
  }
};
