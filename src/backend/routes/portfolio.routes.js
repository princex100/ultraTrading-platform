import { Router } from "express";
import { getUserPortfolio } from "../controllers/portfolio.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/").get(verifyJWT, getUserPortfolio);

export default router;
