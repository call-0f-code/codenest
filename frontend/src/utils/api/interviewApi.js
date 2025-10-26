import api from "./api";

const headers = {
    "Content-Type" : "multipart/form-data"
}

export const getAllInterviewExps = async () => {
    const response = await api.get("/interviews");
    return response.data;
}

export const getInterviewExpById = async (interviewId) => {
    const response = await api.get(`/interviews/${interviewId}`);
    return response.data;
}

export const createInterviewExp = async (formData) => {
    const response = await api.post(`/interviews/`, formData, { headers });
    return response.data;
}

export const updateInterviewExp = async (interviewId, formData) => {
    const response = await api.patch(`/interviews/${interviewId}`, formData, { headers });
    return response.data;
    
}
export const deleteInterviewExp = async (interviewId) => {
    const response = await api.delete(`/interviews/${interviewId}`);
    return response.data
}