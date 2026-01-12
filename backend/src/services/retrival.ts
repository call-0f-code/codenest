import api from "../utils/api";

export async function fetchRAGContext(questionContext?: any) {
  if (!questionContext) return null;

  try {
    // --- CASE 1: DSA (Same as before, working fine) ---
    if (questionContext.type === "DSA") {
      if (questionContext.questionId) {
        const res = await api.get(`/dsa/questions/${questionContext.questionId}`);
        return res.data?.data || null;
      }

      if (questionContext.isTopicOnly && questionContext.topicId) {
        const res = await api.get(`/topics/${questionContext.topicId}/questions`);
        const questions = res.data?.questions || [];
        return {
          ...questionContext,
          relatedQuestions: questions,
          topicOverview: `This topic contains ${questions.length} practice questions.`
        };
      }
    }

    // --- CASE 2 & 3: INTERVIEW SYSTEM (The finale Fix) ---
    if (questionContext.type === "INTERVIEW_EXPERIENCE") {
      const specificRes = await api.get(`/interviews/${questionContext.id}`);
      const specificData = specificRes.data?.data;

  
     
      const globalRes = await api.get(`/interviews?limit=20`);
      const allInterviews = globalRes.data?.data || [];

      return {
        currentInterview: specificData,
        otherInterviews: allInterviews.map((i: any) => ({
          student: i.member?.name || "Anonymous",
          company: i.company,
          verdict: i.verdict,
          id: i._id
        })), 
        contextMeta: questionContext
      };
    }

    // Default Case
    if (questionContext.type === "INTERVIEW_COLLECTION") {
      const res = await api.get(`/interviews?limit=50`);
      const data = res.data?.data || res.data?.interviews || [];
  return data;
    }

  } catch (error: any) {
    console.error("RAG Fetch Error:", error.message);
    return questionContext; 
  }
  return null;
}