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
      history,
    } = req.body;


    // Fetch RAG data 
    const ragData = await fetchRAGContext(questionContext);
    if (ragData) {
      console.log("✅ DATA FOUND. Company:", ragData.company || "N/A");
      console.log("📝 CONTENT PREVIEW:", ragData.content?.substring(0, 50) + "...");
    } else {
      console.log("🔍 DATA TO AI: No record found.");
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
      history: [], // History handled in prompt
    });

    const result = await chat.sendMessage(prompt); // prompt has all context
    const reply = result.response.text();

    // Send Response
    res.json({ reply });

  } catch (error) {
    console.error("Chat Controller Error:", error);

    const err = error as Error;


    res.status(500).json({
      reply: "Cortex is having trouble accessing the context right now. Please try again.",
      error: err.message
    });
  }
}