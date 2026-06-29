export const buildStartupPrompt = (payload) => `

You are an expert startup consultant.

Generate ONE unique startup.

User Idea:
${payload.idea}

Industry:
${payload.industry}

Target Audience:
${payload.targetAudience ?? "General"}

Budget:
${payload.budget ?? "Not specified"}

Country:
${payload.country ?? "Global"}

Return ONLY valid JSON.

{
  "title":"",
  "summary":"",
  "problem":"",
  "solution":"",
  "businessModel":"",
  "marketingStrategy":"",
  "mvpFeatures":[],
  "techStack":[],
  "estimatedBudget":"",
  "roadmap":""
}

DO NOT wrap with markdown.

DO NOT explain anything.

ONLY JSON.
`;
//# sourceMappingURL=ai.prompt.js.map