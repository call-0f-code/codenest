import api from "./api";

export const getAllInterviewExps = async () => {
  const response = await api.get("/interviews");
  return response.data.data;
};

export const getInterviewExpById = async (interviewId) => {
  const response = await api.get(`/interviews/${interviewId}`);
  return response.data.data;
};

export const createInterviewExp = async (interviewData) => {
  const response = await api.post(`/interviews/`, interviewData);
  return response.data.data;
};

export const updateInterviewExp = async (interviewId, interviewData) => {
  const response = await api.patch(`/interviews/${interviewId}`, interviewData);
  return response.data.data;
};

export const deleteInterviewExp = async (interviewId) => {
  const response = await api.delete(`/interviews/${interviewId}`);
  return response.data.data;
};
