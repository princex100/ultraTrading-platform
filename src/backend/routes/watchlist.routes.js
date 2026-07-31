import { Router } from "express";
import { addStockToWatchlist, getwatchlist } from "../controllers/watchlist.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// TODO: Define watchlist routes (e.g., /, /add, /remove)
// router.route("/").get(getUserWatchlist)

router.post("/add",verifyJWT, addStockToWatchlist);
router.get("/",verifyJWT, getwatchlist);

export default router;