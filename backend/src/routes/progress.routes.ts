import { Router } from "express";
import { getCompletedQuestion, toggleQuestion } from "../controllers/progress.controller";


export default function progresRoutes(){
    const router = Router();

    router.get('/:memberId/completed-questions',getCompletedQuestion);

    router.patch('/:memberId/questions/:questionId/completed/toggle',toggleQuestion)

    return router;
}
