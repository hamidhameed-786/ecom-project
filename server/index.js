import dotenv from "dotenv";
import express from "express";
import products from "./api/productsApi.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import userRouter from "./routes/userdata.route.js";
dotenv.config();

const app = express();
const port = process.env.PORT;

// dirname for esm
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// FORM / JSON MIDDLEWARE (must be BEFORE routes)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES (must be BEFORE static)
app.use("/", userRouter);

// STATIC FILES (must be LAST)
app.use(express.static(path.join(__dirname, "./public/product_images")));

// DB connection
import dbConnection from "./config/db.js";
dbConnection();

app.get("/api", (req, res) => {
  res.json(products);
});

app.listen(port, () => {
  console.log(`server is run on port ${port}`);
}); 