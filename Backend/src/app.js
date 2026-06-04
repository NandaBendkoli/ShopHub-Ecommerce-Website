import express from "express";
import cors from "cors";
import { connectToDB } from "./Database/db.js";
import router from "./Routes/index.js";



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: [
            "http://localhost:5173",
        ],
        credentials: true,
    })
);

// connection with db
connectToDB();
// all routes are goes here
app.use("/Ecommerce-website/web/v1", router);


app.use(express.json());

export default app;


