import { Router } from "express";
import { getAllInterviews, getInterviewById, createInterview, updateInterview, deleteInterview } from "../controllers/interview.controller";

export default function topicRouter(){
    const router = Router();

    // Route to get questions by topic ID
    router.get("/", getAllInterviews);
    router.get("/:id", getInterviewById);
    // router.post("/:memberId", createInterview);
    router.post("/", createInterview);
    router.patch("/:id", updateInterview);
    router.delete("/:id", deleteInterview);

    return router;
}

