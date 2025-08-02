import { Router } from "express";
import memberRouter from "./member.routes";
import { Multer } from "multer";

export default function routes(upload:Multer){
    const router = Router();

    router.use('/members', upload.single('file'), memberRouter(upload));

    return router;
}