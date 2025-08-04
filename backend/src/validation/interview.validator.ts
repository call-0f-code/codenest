import { z } from "zod";

export const createInterviewSchema = z.object({
  company: z.string().min(1, "Company is required"),
  role: z.string().min(1, "Role is required"),
  verdict: z.enum(["Selected", "Rejected", "Pending"] as const, {
    message: "Verdict must be Selected, Rejected or Pending",
  }),
  content: z.string().min(10, "Content should be at least 10 characters"),
  isAnonymous: z.boolean(),
});


const optionalFields = z.object({
  company: z.string().min(1).optional(),
  role: z.string().min(1).optional(),
  verdict: z.enum(["Selected", "Rejected", "Pending"]).optional(),
  content: z.string().min(10).optional(),
  isAnonymous: z.boolean().optional(),
});

export const updateInterviewSchema = optionalFields
  .refine(
    (data) =>
      Object.keys(data).some((key) =>
        ["company", "role", "verdict", "content", "isAnonymous"].includes(key)
      ),
    {
      message: "At least one field must be provided to update",
    }
  );