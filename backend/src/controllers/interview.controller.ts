import { Request, Response } from "express";
import { ApiError } from "../utils/apiError";
import api from "../utils/api";
import { createInterviewValidator,updateInterviewValidator } from "../validators/interview.validator";

export const getAllInterviews = async (req: Request, res: Response) => {
  const response = await api.get("/interviews");

  if (!response?.data?.data) {
    throw new ApiError("Failed to fetch interviews", 500);
  }

  res.status(200).json({
    success: true,
    data: response.data.data,
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
  const memberId = req.memberId;

  if (!memberId) {
    throw new ApiError("Unauthorized: Member ID not found", 401);
  }

  const parsed = createInterviewValidator.safeParse(req.body);

   if (!parsed.success) {
    const formattedErrors = parsed.error.issues.map(issue => {
      return `${issue.path.join(".")}: ${issue.message}`;
    });
    throw new ApiError(`Validation failed: ${formattedErrors.join(", ")}`, 400);
  }


  const validatedData = parsed.data;

  const response = await api.post(`/interviews/${memberId}`, validatedData);

  res.status(201).json({
    success: true,
    data: response.data.data,
  });
};


export const updateInterview = async (req: Request, res: Response) => {
  const interviewId = req.params.id;
  const memberId = req.memberId;

  if (!interviewId) {
    throw new ApiError("Interview ID is required", 400);
  }

  if (!memberId) {
    throw new ApiError("Unauthorized: Member ID not found", 401);
  }

  const parsed = updateInterviewValidator.safeParse({
    ...req.body,
    memberId,
  });

  if (!parsed.success) {
    const errorMessages = parsed.error.issues.map(err => err.message).join(", ");
    throw new ApiError(`Validation failed: ${errorMessages}`, 400);
  }

  const validatedData = parsed.data;

  const response = await api.patch(`/interviews/${interviewId}`, validatedData);

  res.status(200).json({
    success: true,
    data: response.data.data,
  });
};


export const deleteInterview = async (req: Request, res: Response) => {
  const interviewId = req.params.id;
  const memberId = req.memberId;

  if (!interviewId) {
    throw new ApiError("Interview ID is required", 400);
  }

  if (!memberId) {
    throw new ApiError("Unauthorized: Member ID not found", 401);
  }

  const response = await api.delete(`/interviews/${interviewId}`);

  res.status(200).json({
    success: true,
    message: response.data.message || "Interview deleted successfully",
  });
};

