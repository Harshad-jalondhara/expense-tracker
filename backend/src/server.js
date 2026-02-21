import "dotenv/config"
import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { ConnectDB } from "./config/db.js"


const app = express();
const PORT = process.env.PORT || 8000

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// ----------------------

app.get("/", (req, res) => {
    res.json({message: "Home Page"});
})






ConnectDB();

app.listen(PORT, () => {
    console.log(`Server Running From http://localhost:${PORT}`);
})