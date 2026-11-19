/*import mongoose from "mongoose";
import { DB_NAME } from "./constants";*/
import dotenv from "dotenv";

import connectDB from "./db/index.js";
import express from "express";

dotenv.config({
    path: './.env'
});



const app = express();
connectDB()
    .then(() => {
        app.on("error", (error) => {
            console.error("ERRR: ", error);
            throw error
        });

        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running on port ${process.env.PORT || 8000}`);
        });
    })
    .catch((error) => {
        console.error("ERROR:", error);
        throw error;
    });





/* (async () => {
     try {

         await mongoose.connect('${process.env.MONGODB_URI}/${DB_NAME}')
         app.on("error", (error) => {
             console.error("ERRR: ", error);
             throw error
         })

         app.listen(process.env.PORT, () => {
             console.log(`Server is running on port ${process.env.PORT}`);

         })
     }

     catch (error) {
         console.error("ERROR:", error)
         throw err
     }
 })
     */
