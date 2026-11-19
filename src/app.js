
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


const app = express();/* method property transfer limit is set to 16kb for both json and urlencoded data. This is to prevent large payloads from being sent to the server, which can cause performance issues or even crashes. */


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,

}));
app.use(cookieParser());
app.use(express.json({ limit: "16kb" }));/* method property transfer limit is set to 16kb for both json and urlencoded data. This is to prevent large payloads from being sent to the server, which can cause performance issues or even crashes. */

app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static("public"))

app.use(cookieParser())





app.get("/", (req, res) => {
    res.send("Server is alive and working");


});

export { app };
