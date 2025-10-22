import { Router } from "express";

import { getAllTopics, getQuestionBytopicId,  } from "../controllers/topics.controller";

export default function topicRouter(){
    const router = Router();

    router.get('/:topicId/questions', getQuestionBytopicId);
    router.get('/',getAllTopics);


    return router;
}