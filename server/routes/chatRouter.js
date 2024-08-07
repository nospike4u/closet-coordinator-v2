import { Router } from "express";
import { createChat } from "../controllers/chat.js";
import { createChat2 } from "../controllers/chat2.js";

const chatRouter = Router();

chatRouter.post("/", createChat);
chatRouter.post("/2", createChat);

export default chatRouter;
