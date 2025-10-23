import api from "./api";

export const getCompletedQuestions = async() => {
    const response = await api.get(`/progress/memberId/completed-questions`);
    return response.data;
}

export const toggleQuestion = async(questionId) => {
    const response = await api.patch(`progress/memberId/questions/${questionId}/completed/toggle`);
    return response.data;
}

