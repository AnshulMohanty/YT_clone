// require(' dotenv').config({path: './.env'})



import dotenv from "dotenv";
import connectDB from "./db/index.js";

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