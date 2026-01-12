import { Request, Response } from "express";
import { fetchRAGContext } from "../services/retrival";
import { buildPrompt } from "../ai/chatBrain";
import { geminiModel } from "../services/ai";

export async function chatController(req: Request, res: Response) {
  try {
    const {
      path,
      userAnswer,
      questionContext,
      history = [], // Added default value
    } = req.body;

    // Fetch RAG data 
    const ragData = await fetchRAGContext(questionContext);
    
    
    if (ragData) {
      console.log(` Context Loaded: ${ragData.company || ragData.topicTitle || 'General'}`);
    }

    const prompt = buildPrompt({
      path,
      ragData,
      userAnswer,
      questionContext,
      history,
    });

    // Call Gemini
    const chat = geminiModel.startChat({
      history: [], 
    });

    try {
      const result = await chat.sendMessage(prompt);
      const reply = result.response.text();
      return res.json({ reply }); // Explicit return
    } catch (aiError: any) {
      // ⚠️ Handle Gemini Specific Overload (503)
      if (aiError.status === 503 || aiError.message?.includes("503")) {
        return res.status(503).json({
          reply: "Google's AI servers are a bit busy 🧠⚡. Please wait 5-10 seconds and try again!",
        });
      }
      throw aiError; // Pass to main catch
    }

  } catch (error) {
    console.error("🚨 Chat Controller Error:", error);
    const err = error as Error;

    res.status(500).json({
      reply: "Cortex encountered an issue. Let's try that again in a moment.",
      error: process.env.NODE_ENV === 'development' ? err.message : undefined // Hide technical error in production
    });
  }
}