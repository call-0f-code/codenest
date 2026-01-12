import fetch from "node-fetch";

export async function fetchRAGContext(questionContext?: any) {
  if (!questionContext) return null;

  try {
    // --- 1. DSA LOGIC ---
    if (questionContext.type === "DSA") {
      if (questionContext.questionId) {
        const res = await fetch(`${process.env.API_URL}/dsa/questions/${questionContext.questionId}`);
        return res.ok ? await res.json() : null;
      }

      if (questionContext.isTopicOnly && questionContext.topicId) {
        const res = await fetch(`${process.env.API_URL}/topics/${questionContext.topicId}`);
        return res.ok ? await res.json() : null;
      }
    }

    // --- 2. INTERVIEW COLLECTION (Analysis Mode) ---

    if (questionContext.type === "INTERVIEW_COLLECTION") {
      if (questionContext.interviewIds && questionContext.interviewIds.length > 0) {
        const res = await fetch(`${process.env.API_URL}/interviews?ids=${questionContext.interviewIds.join(',')}`);
        const data = await res.json() as any;
        return Array.isArray(data) ? data : (data.interviews || []);
      }

      const res = await fetch(`${process.env.API_URL}/interviews/all`);
      if (!res.ok) return [];
      const data = await res.json() as any;
      return Array.isArray(data) ? data : (data.interviews || []);
    }


    if (questionContext.type === "INTERVIEW_EXPERIENCE") {
      const res = await fetch(`http://localhost:3000/api/v1/interviews/${questionContext.id}`);

      if (res.ok) {
        const json = await res.json() as any;

        // Extract the actual data (handling potential API wrappers)
        const actualData = json.data || json.interview || json;

        console.log("SUCCESS: Data found for", actualData.company);
        return { ...questionContext, ...actualData };
      }
      console.log("Fetch failed. Status:", res.status);
      return questionContext;
    }

  } catch (error) {
    console.error("Error in RAG retrieval:", error);
    return null;
  }

  return null;
}