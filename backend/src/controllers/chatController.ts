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

    // 1️⃣ Debugging: Check what the frontend is actually sending
    console.log("📥 Incoming Request Context:", JSON.stringify(questionContext, null, 2));

    // 2️⃣ Fetch RAG data (Ab ye Topic aur Question dono handle karega)
    const ragData = await fetchRAGContext(questionContext);
    if (ragData) {
    console.log("✅ DATA FOUND. Company:", ragData.company || "N/A");
    console.log("📝 CONTENT PREVIEW:", ragData.content?.substring(0, 50) + "...");
} else {
    console.log("🔍 DATA TO AI: No record found.");
}

    // 3️⃣ Build smart prompt 
    // Isme hum context pass kar rahe hain taaki AI ko pata chale user kahan hai
    const prompt = buildPrompt({
      path,
      ragData,
      userAnswer,
      questionContext,
      history,
    });

    // 4️⃣ Call Gemini
    const chat = geminiModel.startChat({
      history: [], // History hum buildPrompt ke andar handle kar rahe hain string format mein
    });

    const result = await chat.sendMessage(prompt); // 'prompt' mein baseRole, ragData, aur history sab hai.
    const reply = result.response.text();

    // 5️⃣ Send Response
    res.json({ reply });

  } catch (error) {
    console.error("❌ Chat Controller Error:", error);

    const err = error as Error;

    // Error response ko thoda better banaya taaki debugging easy ho
    res.status(500).json({
      reply: "Cortex is having trouble accessing the context right now. Please try again.",
      error: err.message
    });
  }
}