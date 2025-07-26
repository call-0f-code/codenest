import { Router } from "express";
import interviewRouter from "./interviews"
export default function routes(){
    const router = Router();

    router.use("/interviews", interviewRouter());
    return router;
}