import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();


app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}))


app.use(express.json({limit: "20kb"}))

app.use(express.urlencoded({ extended: true, limit: "20kb" }));

app.use(express.static("public"))

app.use(cookieParser());


// routes  

                                            //(RECAP KRR CAUSE SHOULD HV RUN HERE BUT INDEX ME RUN HO RHA HAI)

import userRouter from "./routes/user.routes.js";

app.get("/health",()=>{
  console.log("Health is ok");
 })

// routes declaration
 app.use("/api/v1/users", userRouter);
             // it will make route like https://localhoat:8000/api/v1/users/register





export { app };