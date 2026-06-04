import mongoose from "mongoose";
import dotenv from "dotenv";
import chalk from "chalk";

dotenv.config();
const url = process.env.MONGODB_URL;

export const connectToDB = async () => {
    try {
        const connect = await mongoose.connect(url)
        if (connect) {
            console.log(chalk.bgGreen("Connection Successful With Database!"));
        }
    }
    catch (error) {
        console.log(chalk.bgRed("Error in Database connection"))
    }
}