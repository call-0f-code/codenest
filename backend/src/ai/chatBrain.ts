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
    return `
${baseRole}
User is currently browsing the topic: ${questionContext.topicTitle}.

Conversation so far:
${formatHistory(history)}

Instructions:
- Provide a brief overview of ${questionContext.topicTitle}.
- Mention common interview patterns.

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
    // 🛡️ SAFETY CHECK: Ensure ragData is an array before mapping
    const allExperiences = Array.isArray(ragData) 
      ? ragData.map((exp: any) => `
          Company: ${exp.company}
          Verdict: ${exp.verdict}
          Experience: ${exp.content}
        `).join("\n---\n")
      : "No interview data available to analyze.";

    return `
${baseRole}
You are an Interview Analyst. You have access to ${questionContext.count || 0} interview stories.

DATASET:
${allExperiences}

User Question: ${userAnswer}

Instructions:
- Analyze the common patterns in the stories provided.
- Identify common mistakes leading to "Rejected" verdicts.
- Determine which companies focused more on DSA.
`;
  }

  // --- CASE 4: SINGLE INTERVIEW EXPERIENCE ---
  // chatBrain.ts update for CASE 4
// --- CASE 4: SINGLE INTERVIEW EXPERIENCE ---
if (questionContext?.type === "INTERVIEW_EXPERIENCE") {
  const interview = ragData || questionContext; 
  // Added a check to see if content is actually there
  const content = ragData?.content || "No database content found. Request might have failed.";

  // LOGGING: Check your backend terminal to see what is being packed into the prompt
  console.log("🛠️ PROMPT BUILDING WITH CONTENT:", content.substring(0, 50) + "...");

  return `
${baseRole}
CURRENT CONTEXT:
Company: ${interview.company}
Role: ${interview.role}
Verdict: ${interview.verdict}
Full Experience: ${content}

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