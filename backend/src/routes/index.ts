import { Router } from "express";
import memberRouter from "./member.routes";
import { Multer } from "multer";
import topicRouter from "./topics.routes";
import questionRoutes from "./question.routes";
import { auth } from "../middleware/memberAuth";
import progressRoutes from "./progress.routes";

export default function routes(upload:Multer){
    const router = Router();

    router.use('/members', upload.single('file'), memberRouter(upload));

    router.use(auth);
    
    router.use('/topics',topicRouter());

    router.use('/questions',questionRoutes());

    router.use('/progress',progressRoutes());

    return router;
}