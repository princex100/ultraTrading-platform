import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";


const app = express();


export const server = http.createServer(app);


const allowedOrigins = [
    process.env.CORS_ORIGIN,
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:5174',
    'http://127.0.0.1:5174'
].filter(Boolean);


export const io = new Server(server, {
    cors: {
        origin: allowedOrigins,
        credentials: true
    }
});


io.on("connection", (socket) => {

    console.log(`a user connected ${socket.id}`);

    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
    });

});


app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));


app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());


// Route imports
import userRouter from "./routes/user.routes.js";
import stockRouter from "./routes/stock.routes.js";
import portfolioRouter from "./routes/portfolio.routes.js";
import transactionRouter from "./routes/transaction.routes.js";
import watchlistRouter from "./routes/watchlist.routes.js";
// import chatRouter from "./routes/chat.routes.js";
import newsRouter from "./routes/news.routes.js";
import portfolioHistoryRouter from "./routes/portfolioHistory.route.js"

// Mount routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/stocks", stockRouter);
app.use("/api/v1/portfolio", portfolioRouter);
app.use("/api/v1/transactions", transactionRouter);
app.use("/api/v1/watchlist", watchlistRouter);
// app.use("/api/v1/chat", chatRouter);
app.use("/api/v1/news", newsRouter);
app.use("api/v1/portfolio-history",portfolioHistoryRouter)

// Global Error Handler
import { errorHandler } from "./middlewares/error.middleware.js";


app.use(errorHandler);


export { app };
