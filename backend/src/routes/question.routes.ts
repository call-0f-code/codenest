import { Router } from "express";
import { getQuestionByQuestionId } from "../controllers/question.controller";

export default function questionRoutes(){
    const router = Router();

    router.get('/:questionId',getQuestionByQuestionId);
    
    return router;
}