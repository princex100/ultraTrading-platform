import { Router } from "express";
import { getPortfolioHistory } from "../controllers/portfolioHistory.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router=Router();

router.get("/",verifyJWT,getPortfolioHistory);

export default router;
