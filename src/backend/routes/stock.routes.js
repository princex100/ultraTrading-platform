import { Router } from "express";
import { getAllStocks, getStockById } from "../controllers/stock.controller.js";

const router = Router();


router.get("/",getAllStocks)
router.get("/:id", getStockById)
// router.route("/").get(getAllStocks)
// router.route("/:symbol").get(getStockBySymbol)

export default router;
