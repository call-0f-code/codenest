import api from "./api";

export const getTopics = async() => {
    const response = await api.get('/topics/');
    return response.data;
}

export const getQuestionsById = async(topicId) => {
    const response = await api.get(`/topics/${topicId}/questions`);
    return response.data;
}