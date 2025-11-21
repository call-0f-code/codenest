import { Request, Response } from "express";
import { ApiError } from "../utils/apiError";
import api from "../utils/api";

export const getAllInterviews = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const verdict = (req.query.verdict as string) || "All";

  const response = await api.get(`/interviews?page=${page}&limit=${limit}&verdict=${verdict}`);

  return res.status(200).json({
    success: true,
    data: response.data.data,       
    page: response.data.page,
    limit: response.data.limit,
    verdict: response.data.verdict,
    total: response.data.total,
    totalPages: response.data.totalPages,
  });
};



export const getInterviewById = async (req: Request, res: Response) => {
  const interviewId = req.params.id;

  if (!interviewId) {
    throw new ApiError("Interview ID is required", 400);
  }

  const response = await api.get(`/interviews/${interviewId}`);

  if (!response?.data?.data) {
    throw new ApiError("Interview not found", 404);
  }

  res.status(200).json({
    success: true,
    data: response.data.data,
  });
};


export const createInterview = async (req: Request, res: Response) => {
  const memberId = req.userId;

  if (!memberId) {
    throw new ApiError("Unauthorized: Member ID not found", 401);
  }


  const validatedData = req.body;

  const response = await api.post(`/interviews/${memberId}`, validatedData);

  res.status(201).json({
    success: true,
    data: response.data.data,
  });
};


export const updateInterview = async (req: Request, res: Response) => {
  const interviewId = req.params.id;
  const memberId = req.userId;

  if (!interviewId) {
    throw new ApiError("Interview ID is required", 400);
  }

  if (!memberId) {
    throw new ApiError("Unauthorized: Member ID not found", 401);
  }

  
  const validatedData = {
    ...req.body,      
    memberId,         
  };

  const response = await api.patch(`/interviews/${interviewId}`, validatedData);

  res.status(200).json({
    success: true,
    data: response.data.data,
  });
};


export const deleteInterview = async (req: Request, res: Response) => {
  const interviewId = req.params.id;
  const memberId = req.userId;

  if (!interviewId) {
    throw new ApiError("Interview ID is required", 400);
  }

  if (!memberId) {
    throw new ApiError("Unauthorized: Member ID not found", 401);
  }

  const response = await api.delete(`/interviews/${interviewId}`, {
    data: { memberId },
  });

  res.status(200).json({
    success: true,
    message: response.data.message || "Interview deleted successfully",
  });
};

