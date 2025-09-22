// require(' dotenv').config({path: './.env'})



import dotenv from "dotenv";
import connectDB from "./db/index.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

dotenv.config({
  path: './.env'
});

connectDB()

  .then(() => {
    app.on("error", (error) => {
      console.log("Error:", error);
      throw error;
    });

    app.listen(process.env.PORT || 8000, () => {
      console.log(`App is listening on port: ${process.env.PORT || 8000}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed", err);
});






app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}))


app.use(express.json({limit: "20kb"}))

app.use(express.urlencoded({ extended: true, limit: "20kb" }));

app.use(express.static("public"))

app.use(cookieParser());


// routes

import userRouter from "./routes/user.routes.js";

app.get("/health",(req,res)=>{
  console.log("Health is ok");
  res.status(200).send("OK");
 })

// routes declaration
 app.use("/api/v1/users", userRouter);
             // it will make route like https://localhoat:8000/api/v1/users/register











































// PROFESSIONAL APPROACH !!!!!

/*
import express from "express";
const app = express();

( async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/${DB_Name}`);
    
    app.on("error", (error) => {
      console.log("Errr:", error);
      throw error
    })

    app.listen(process.env.PORT, () => {
      console.log(`App is listening on port ${process.env.PORT}`);
    })

  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error
  }
})();
*/