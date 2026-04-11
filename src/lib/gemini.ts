import { GoogleGenAI, Type } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.warn('GEMINI_API_KEY is missing. AI features will not work.');
}

export const ai = new GoogleGenAI({ apiKey: apiKey || 'dummy-key' });

export async function generateContent(prompt: string) {
  if (!apiKey) throw new Error('API key is missing.');
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error('Error generating content:', error);
    throw new Error('Failed to generate content. Please try again.');
  }
}

export async function analyzeThumbnails(images: { data: string, mimeType: string }[], context: string) {
  if (!apiKey) throw new Error('API key is missing.');
  
  try {
    const parts: any[] = images.map(img => ({
      inlineData: {
        data: img.data.split(',')[1], // Remove data:image/jpeg;base64, prefix
        mimeType: img.mimeType
      }
    }));
    
    parts.push({
      text: `Analyze these YouTube thumbnails for a video about: "${context}". 
      Evaluate them based on:
      1. Clarity and readability (especially on small screens)
      2. Emotional impact and curiosity gap
      3. Contrast and color theory
      4. Overall click-through rate (CTR) potential
      
      Rank them from best to worst, and provide specific reasons why the top one is the winner, and how the others could be improved.`
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.1-pro-preview', // Use pro for better reasoning
      contents: { parts }
    });
    return response.text;
  } catch (error) {
    console.error('Error analyzing thumbnails:', error);
    throw new Error('Failed to analyze thumbnails.');
  }
}

export async function analyzeChannel(statsOrUrl: string, language: string = 'English') {
  if (!apiKey) throw new Error('API key is missing.');
  
  try {
    const isUrl = statsOrUrl.startsWith('http');
    const prompt = `Act as an expert YouTube strategist. Analyze the following channel ${isUrl ? 'URL' : 'statistics/context'} and provide a detailed, actionable growth plan. Identify potential mistakes and suggest improvements for content strategy, pacing, and audience retention. Please provide the output in ${language}.
    
    Channel Info:
    ${statsOrUrl}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.1-pro-preview',
      contents: prompt,
      tools: isUrl ? [{ googleSearch: {} }] : undefined,
    });
    return response.text;
  } catch (error) {
    console.error('Error analyzing channel:', error);
    throw new Error('Failed to analyze channel.');
  }
}

export async function generateMetadata(topic: string, language: string = 'English') {
  if (!apiKey) throw new Error('API key is missing.');
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a complete YouTube metadata package for a video about: "${topic}". Please provide the output in ${language}.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            titles: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "5 highly clickable, optimized titles"
            },
            description: { 
              type: Type.STRING,
              description: "A full, SEO-optimized description including a hook, summary, timestamps placeholder, and social links placeholder"
            },
            tags: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "20 highly relevant tags"
            },
            keywords: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "10 primary target keywords"
            },
            thumbnailPrompts: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "5 distinct, highly visual ideas for the thumbnail design"
            }
          },
          required: ["titles", "description", "tags", "keywords", "thumbnailPrompts"]
        }
      }
    });
    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error('Error generating metadata:', error);
    throw new Error('Failed to generate metadata.');
  }
}

export async function chatWithAssistant(message: string, history: {role: string, text: string}[], language: string = 'English') {
  if (!apiKey) throw new Error('API key is missing.');

  try {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: `You are an expert YouTube and social media growth assistant. Provide highly actionable, strategic, and encouraging responses. Always respond in ${language}.`
      }
    });

    let fullMessage = message;
    if (history.length > 0) {
      const historyContext = history.map(h => `${h.role === 'user' ? 'User' : 'Assistant'}: ${h.text}`).join('\n');
      fullMessage = `Previous conversation:\n${historyContext}\n\nUser: ${message}`;
    }

    const response = await chat.sendMessage({ message: fullMessage });
    return response.text;
  } catch (error) {
    console.error('Error chatting with assistant:', error);
    throw new Error('Failed to get response from assistant.');
  }
}

export async function generateAdvancedScript(topic: string, category: string, types: string[], length: string, language: string) {
  if (!apiKey) throw new Error('API key is missing.');
  try {
    const prompt = `Write a highly engaging video script about "${topic}".
    Category/Niche: ${category}
    Script Elements to include: ${types.join(', ')}
    Target Duration: ${length}
    Language: ${language}

    Format the output with clear headings (e.g., [Intro], [Body], [Outro]) and estimated timestamps (e.g., [0:00 - 0:15]).
    Make sure the pacing matches the target duration.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-pro-preview',
      contents: prompt
    });
    return response.text;
  } catch (error) {
    console.error('Error generating advanced script:', error);
    throw new Error('Failed to generate advanced script.');
  }
}

export async function generateVisualPrompts(script: string, duration: string, promptLanguage: string = 'English', voiceoverLanguage: string = 'English') {
  if (!apiKey) throw new Error('API key is missing.');
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-pro-preview',
      contents: `You are an expert video editor and director. Break down the following script into visual scenes. Each scene should be approximately ${duration} long.
      
      Format the output as a JSON array of objects, where each object has:
      - "voiceover": The exact text spoken in the scene, translated to ${voiceoverLanguage}.
      - "visualPrompt": A highly detailed prompt for an AI image/video generator (like Midjourney or Runway) describing what is seen on screen, written in ${promptLanguage}.
      
      Script:
      "${script}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              voiceover: { type: Type.STRING },
              visualPrompt: { type: Type.STRING }
            },
            required: ["voiceover", "visualPrompt"]
          }
        }
      }
    });
    return JSON.parse(response.text || '[]');
  } catch (error) {
    console.error('Error generating visual prompts:', error);
    throw new Error('Failed to generate visual prompts.');
  }
}
