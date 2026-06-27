import { GoogleGenAI } from "@google/genai";
import config from "../../config/index.js";
const ai = new GoogleGenAI({
    apiKey: config.geminiApiKey,
});
export const generateStartup = async (prompt) => {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
    });
    const text = response.text;
    if (!text) {
        throw new Error("Failed to generate startup");
    }
    const cleaned = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
    return JSON.parse(cleaned);
};
//# sourceMappingURL=ai.service.js.map