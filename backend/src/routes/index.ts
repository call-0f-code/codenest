import { Router } from "express";
import memberRouter from "./member.routes";
import { Multer } from "multer";
import topicRouter from "./topics.routes";
import questionRoutes from "./question.routes";
import progresRoutes from "./progress.routes";
import { auth } from "../middleware/memberAuth";

export default function routes(upload:Multer){
    const router = Router();

    router.use('/members', upload.single('file'), memberRouter(upload));

    router.use(auth);
    
    router.use('/topics',topicRouter());

    router.use('/questions',questionRoutes());

    router.use('/progress',progresRoutes());

    return router;
}