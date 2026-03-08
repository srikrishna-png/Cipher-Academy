import zxcvbn from 'zxcvbn';

export interface EntropyResult {
  score: number; // 0 to 4
  crackTimeDisplay: string;
  feedback: {
      warning: string;
      suggestions: string[];
  };
  calcTimeMs: number;
}

export const analyzePassword = (password: string): EntropyResult => {
    if (!password) {
        return {
            score: 0,
            crackTimeDisplay: "Instant",
            feedback: { warning: "", suggestions: [] },
            calcTimeMs: 0
        };
    }
    
    const result = zxcvbn(password);
    
    return {
        score: result.score,
        crackTimeDisplay: String(result.crack_times_display.offline_slow_hashing_1e4_per_second), // Realistic offline attack
        feedback: {
            warning: result.feedback.warning,
            suggestions: result.feedback.suggestions
        },
        calcTimeMs: result.calc_time
    };
}
