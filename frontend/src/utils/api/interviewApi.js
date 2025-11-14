import api from "./api";

export const getAllInterviewExps = async (page = 1, limit = 10) => {
  const response = await api.get(`/interviews?page=${page}&limit=${limit}`);
  return response.data; 
  // response.data contains: data, page, limit, total, totalPages
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
