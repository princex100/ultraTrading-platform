import { Router } from "express";
import { getMarketNews } from "../controllers/news.controller.js";

const router = Router();

router.get("/market", getMarketNews);

export default router;