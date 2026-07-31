import { Router } from "express";
import { chatbotcontext, generalChatbotContext } from "../controllers/chat.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();


router.post("/authorized-chat", verifyJWT, chatbotcontext);
router.post("/", generalChatbotContext);

export default router;
