import { Router } from "express";
import { chatController } from "../controllers/chatController";

const chatRouter = Router();

chatRouter.post("/", chatController);

export default chatRouter;
