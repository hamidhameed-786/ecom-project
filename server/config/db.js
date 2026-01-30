import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

function dbConnection() {
  mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Database Connected");
  });
}

export default dbConnection;
