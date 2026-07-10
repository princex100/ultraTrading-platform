import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { 
    buyStock, 
    sellStock, 
    getUserTransactions, 
    depositFunds, 
    withdrawFunds 
} from "../controllers/transaction.controller.js";

const router = Router();

// Apply auth middleware to all transaction routes
router.use(verifyJWT);

router.post("/buy", buyStock);
router.post("/sell", sellStock);
router.get("/history", getUserTransactions);
router.post("/deposit", depositFunds);
router.post("/withdraw", withdrawFunds);

export default router;
