
import { GoogleGenAI, Type } from "@google/genai";

// Use process.env.API_KEY directly in the service methods to ensure the latest key is used.
// Per guidelines, we must use { apiKey: process.env.API_KEY }.

export const getMathExplanation = async (concept: string, query: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      // Use gemini-3-pro-preview for complex engineering math reasoning tasks.
      model: 'gemini-3-pro-preview',
      contents: `As an expert engineering mathematics professor, explain the following in the context of engineering: Concept: ${concept}. Question: ${query}. Use professional yet accessible language. Break it down into logic steps if applicable.`,
      config: {
        temperature: 0.7,
        topP: 0.95,
        // maxOutputTokens is omitted to prevent truncated responses.
      }
    });

    // Access .text property directly (it is a getter, not a method).
    return response.text || "I couldn't generate an explanation at this moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error communicating with the AI tutor. Please try again later.";
  }
};

export const getQuizFeedback = async (score: number, total: number, category: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const percentage = (score / total) * 100;
  
  try {
    const response = await ai.models.generateContent({
      // Basic text feedback tasks use gemini-3-flash-preview.
      model: 'gemini-3-flash-preview',
      contents: `The student scored ${score}/${total} (${percentage}%) on a ${category} quiz for engineering mathematics. Provide a short, encouraging, and highly technical piece of feedback that highlights the importance of this subject in engineering. Keep it under 3 sentences.`,
      config: {
        temperature: 0.8,
      }
    });

    return response.text || "Solid effort on the quiz!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Excellent work mastering these engineering foundations.";
  }
};

export const generateEngineeringExample = async (mathTopic: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      // Complex reasoning task for generating structured real-world examples.
      model: 'gemini-3-pro-preview',
      contents: `Provide a specific real-world engineering application for the mathematical topic: ${mathTopic}. Format your response as a JSON object with 'title', 'scenario', and 'equations' fields.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            scenario: { type: Type.STRING },
            equations: { type: Type.STRING }
          },
          required: ["title", "scenario", "equations"]
        }
      }
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
};
