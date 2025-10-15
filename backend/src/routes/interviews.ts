import { Router } from "express";
import { getAllInterviews, getInterviewById, createInterview, updateInterview, deleteInterview } from "../controllers/interview.controller";
import { validate } from "../middleware/validate";
import { createInterviewSchema, updateInterviewSchema } from "../validation/interview.validator";

export default function interviewRouter(){
    const router = Router();

    // Route to get questions by topic ID
    router.get("/", getAllInterviews);
    router.get("/:id", getInterviewById);
    // router.post("/:memberId", createInterview);
    router.post("/", validate(createInterviewSchema), createInterview);
    router.patch("/:id", validate(updateInterviewSchema) ,updateInterview);
    router.delete("/:id", deleteInterview);

    return router;
}

