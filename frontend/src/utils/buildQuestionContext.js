export function buildQuestionContext({ topic, question = null }) {
  // Agar topic hi nahi hai, toh kuch nahi bhej sakte
  if (!topic) return null;

  // Case 1: Agar sirf Topic level context chahiye (Jab user questions list dekh raha ho)
  if (!question) {
    return {
      type: "DSA",
      topicId: topic.id,
      topicTitle: topic.title,
      isTopicOnly: true, // Backend ko batane ke liye ki abhi question select nahi hua
    };
  }

  // Case 2: Agar user ne question select kar liya hai
  return {
    type: "DSA",
    topicId: topic.id,
    topicTitle: topic.title,
    questionId: question.id,
    questionName: question.questionName,
    difficulty: question.difficulty,
    link: question.link,
    isTopicOnly: false
  };
}