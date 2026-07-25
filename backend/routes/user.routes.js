import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { registerUser, verifyEmail, login, getCurrentUser, refreshAccessToken } from "../controllers/user.controller.js";
import {googleOauth} from "../controllers/user.controller.js"

const router = Router();


router.post("/register", registerUser);
router.post("/verify-email", verifyEmail);
router.post("/login", login);
router.post("/refresh-token", refreshAccessToken);
router.post("/google",googleOauth)

// Secure routes
router.get("/current-user", verifyJWT, getCurrentUser);


export default router;