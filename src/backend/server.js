import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { app, server } from "./app.js";
import { startStockSimulator } from "./services/stockSimulator.js";

dotenv.config({
    path: './.env'
});

const PORT = process.env.PORT || 8000;

server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
        console.error(`Port ${PORT} is already in use. Stop the existing backend process or set a different PORT in .env.`);
        process.exit(1);
    }

    console.error("Server failed to start:", err);
    process.exit(1);
});

connectDB()
.then(() => {

    
    server.listen(PORT, () => {
        console.log(`⚙️ Server is running at port : ${PORT}`);
    });
    
    
    startStockSimulator();  
    
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
});
