const formatHistory = (history: { from: string; text: string }[] = []) =>
  history
    .map((m) => `${m.from === "user" ? "User" : "Assistant"}: ${m.text}`)
    .join("\n");

export function buildPrompt({
  path,
  ragData,
  userAnswer,
  questionContext,
  history = [],
}: {
  path: string;
  ragData: any;
  userAnswer: string;
  questionContext?: any;
  history?: { from: string; text: string }[];
}) {
  const baseRole = `
You are Cortex, an intelligent AI analyst for "Call of Code".
STRICT LIMITATION: Your knowledge is limited EXCLUSIVELY to DSA and Interview Experiences.

🎯 YOUR GOALS:
1. If user says hi or hello, greet them back briefly and ask how you can assist in DSA/Interview prep.
2. Provide accurate, concise, and relevant answers ONLY related to DSA problems or interview experiences.
3. Politely refuse to answer anything outside DSA/Interviews with the Refusal Message below.

💡 SPECIAL INSTRUCTIONS BASED ON CONTEXT:
1. DSA HELP (3-Step Method): 
   - Start with a **simple hint** only.
   - If user asks for solution (e.g., "give code", "solve it"), provide: (a) Brute-force logic + code, (b) Optimal solution + code.
   - Suggest 2-3 similar practice problems from LeetCode/GFG/CodeChef.
2. CAREER QUESTIONS: Define the role, list skills, give a step-by-step roadmap, and suggest learning platforms.
3. INTERVIEW ANALYSIS: Provide direct answers based on stories. DO NOT give hints for interview data queries.

RULES:
- If the query is NOT about DSA/Interviews, use the Refusal Message: "I am Cortex, specialized only in DSA and Interview analysis. Let's stay focused on your preparation!"
- Do NOT start a mock interview. Do NOT act as Alex.
- Use Markdown (bold, headers, code blocks) and emojis 🚀.
`;

  console.log("🧠 QUESTION CONTEXT IN chatBrain 👉", questionContext);

 // --- CASE 1: DSA TOPIC ONLY ---
if (questionContext?.type === "DSA" && questionContext.isTopicOnly) {
  const questionsList = ragData?.relatedQuestions 
    ? ragData.relatedQuestions.map((q: any) => `- ${q.title}`).join("\n")
    : "No questions listed for this topic yet.";

  return `
${baseRole}
User is browsing: ${questionContext.topicTitle}
Available Questions in this topic:
${questionsList}

Instructions:
- Briefly explain the importance of ${questionContext.topicTitle} in interviews.
- If user asks what to solve, suggest questions from the list above.

User Query: ${userAnswer}
`;
}

  // --- CASE 2: SPECIFIC DSA QUESTION ---
  if (questionContext?.type === "DSA" && questionContext.questionId) {
    const context = ragData ? `QUESTION: ${ragData.question}\nCONCEPT: ${ragData.concept}` : "No specific details available.";
    
    return `
${baseRole}
Conversation so far:
${formatHistory(history)}

CURRENT QUESTION: ${questionContext.questionName} (${questionContext.topicTitle})
${context}

USER ANSWER / CODE:
${userAnswer}

Instructions:
- Give ONLY a hint first.
- Point out logical mistakes.
`;
  }

  // --- CASE 3: INTERVIEW ANALYST (COLLECTION) ---
  if (questionContext?.type === "INTERVIEW_COLLECTION") {
    // Check if ragData exists and has items
    const allExperiences = (Array.isArray(ragData) && ragData.length > 0)
      ? ragData.slice(0, 10).map((exp: any) => // Top 10 for performance
          `Student: ${exp.member?.name || "User"} | Company: ${exp.company} | Verdict: ${exp.verdict} | Summary: ${exp.role}`
        ).join("\n")
      : "No specific interview stories found in the database.";

    return `
${baseRole}
CONTEXT: The user is looking at the Interview Experiences page.
DATABASE SUMMARY (Last few stories):
${allExperiences}

User Question: ${userAnswer}

Instructions:
- Analyze the common patterns in the stories provided.
- Identify common mistakes leading to "Rejected" verdicts.
- Determine which companies focused more on DSA.
- If they ask for details of a specific person, tell them to click on that card for a deep-dive analysis.
`;
  }

  // --- CASE 4: SINGLE INTERVIEW EXPERIENCE ---
if (questionContext?.type === "INTERVIEW_EXPERIENCE") {
  const current = ragData?.currentInterview || questionContext;
  const content = ragData?.currentInterview?.content || "Story content loading...";
  const studentName = current.member?.name || current.studentName || "the candidate";

  return `
${baseRole}
CONTEXT: Interview for ${current.company}.
CANDIDATE: ${studentName} | VERDICT: ${current.verdict}
DATA: """${content}"""

INSTRUCTIONS:
1. If the user says "hi" or "hello", greet them professionally and ask what they want to know specifically.
2. Provide the FULL ANALYSIS ONLY if the user asks a specific question (e.g., "what rounds?", "questions?", "give analysis").
3. Use this format for analysis:
   🔍 **Analysis: ${current.company} Journey**
   - **The Process**: ...
   - **Technical Deep-Dive**: ...
   - **The Verdict Factor**: ...

User Query: ${userAnswer}
`;
}

  // --- CASE 5: DEFAULT FALLBACK ---
  return `
${baseRole}
Conversation so far:
${formatHistory(history)}
User message: ${userAnswer}
`;
}