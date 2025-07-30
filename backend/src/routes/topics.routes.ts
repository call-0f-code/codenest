import { Router } from "express";

import { getAllTopics, getQusetionBytopicId } from "../controllers/topics.controller";

export default function topicRouter(){
    const router = Router();

    router.get('/:topicId/questions', getQusetionBytopicId);

    router.get('/',getAllTopics);

    router.get('/:topicId/questions',getQusetionBytopicId);

    return router;
}