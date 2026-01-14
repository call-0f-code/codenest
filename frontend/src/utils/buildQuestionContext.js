export function buildQuestionContext({ topic, question = null }) {
  if (!topic) return null;

  // common base context
  const base = {
    type: "DSA",
    topicId: topic.id || topic._id,
    topicTitle: topic.title,
  };

  if (!question) {
    return {
      ...base,
      isTopicOnly: true,
    };
  }

  return {
    ...base,
    questionId: question.id || question._id, // Backend fetch ke liye zaroori
    questionName: question.questionName,
    difficulty: question.difficulty,
    link: question.link,
    isTopicOnly: false
  };
}