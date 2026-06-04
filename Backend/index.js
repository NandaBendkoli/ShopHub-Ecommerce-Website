import app from "./src/app.js";
import dotenv from "dotenv";
import chalk from "chalk";



dotenv.config();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(" ")
    console.log(chalk.bgMagenta(`Server is running on port ${PORT} http://localhost:${PORT}/`));
    console.log(" ")
});