import { GoogleGenAI, Type } from "@google/genai";
import { Product, Platform } from "../types";

// Always use the process.env.API_KEY directly for initialization as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const PRODUCT_SCHEMA = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      id: { type: Type.STRING },
      name: { type: Type.STRING },
      price: { type: Type.NUMBER },
      originalPrice: { type: Type.NUMBER },
      platform: { type: Type.STRING },
      rating: { type: Type.NUMBER },
      reviewsCount: { type: Type.NUMBER },
      imageUrl: { type: Type.STRING },
      features: { type: Type.ARRAY, items: { type: Type.STRING } },
      description: { type: Type.STRING },
      aiScore: { type: Type.NUMBER },
      bestValue: { type: Type.BOOLEAN },
      link: { type: Type.STRING },
      pros: { type: Type.ARRAY, items: { type: Type.STRING } },
      cons: { type: Type.ARRAY, items: { type: Type.STRING } },
      platformPrices: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            platform: { type: Type.STRING },
            price: { type: Type.NUMBER },
            url: { type: Type.STRING }
          },
          required: ["platform", "price"]
        }
      }
    },
    required: ["id", "name", "price", "platform", "aiScore"]
  }
};

export async function searchProducts(query: string, preferences?: any): Promise<{ products: Product[], answer: string }> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Search for products related to: "${query}". 
      Platform focus: Amazon, Flipkart, Myntra, Ajio, Meesho.
      For each product, also find the prices for that EXACT MODEL on at least 2 other platforms to allow for visualization.
      Current context/preferences: ${JSON.stringify(preferences || {})}.
      Provide a list of realistic search results across these platforms.
      Return the answer in two parts: a friendly helpful summary answer first, then a list of items.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            answer: { type: Type.STRING, description: "A concise AI summary of the options found, recommending the best match based on the user's intent." },
            products: PRODUCT_SCHEMA
          },
          required: ["answer", "products"]
        }
      }
    });

    // Directly access the .text property as per guidelines
    const data = JSON.parse(response.text || "{}");
    // Ensure IDs are unique and images are valid
    data.products = data.products.map((p: any, idx: number) => ({
      ...p,
      id: p.id || `gen-${idx}-${Date.now()}`,
      imageUrl: p.imageUrl || `https://picsum.photos/seed/${p.name.replace(/\s/g, '')}/400/400`
    }));
    
    return data;
  } catch (error) {
    console.error("Gemini Search Error:", error);
    return { products: [], answer: "I'm sorry, I'm having trouble fetching live deals right now. Please try again." };
  }
}

export async function getDetailedComparison(products: Product[]): Promise<string> {
  const productSummary = products.map(p => `${p.name} on ${p.platform} for ₹${p.price}`).join(', ');
  try {
    const response = await ai.models.generateContent({
      // Using gemini-3-pro-preview for advanced reasoning and comparison tasks
      model: "gemini-3-pro-preview",
      contents: `Analyze these products for a side-by-side comparison: ${productSummary}. 
      Give me a clear verdict on which one is the "Best Value", "Best Performance", and "Best Budget".
      Format your response in friendly Markdown.`,
    });
    // Access the .text property directly
    return response.text || "Comparison data unavailable.";
  } catch (err) {
    return "Failed to generate detailed comparison.";
  }
}