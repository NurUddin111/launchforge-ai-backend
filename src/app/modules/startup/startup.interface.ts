export interface TGenerateStartupPayload {
  idea: string;
  industry: string;
  targetAudience?: string;
  budget?: number;
  country?: string;
}

export interface TGeneratedStartup {
  title: string;
  summary: string;
  problem: string;
  solution: string;
  businessModel: string;
  marketingStrategy: string;
  mvpFeatures: string[];
  techStack: string[];
  estimatedBudget: string;
  roadmap: string;
}
