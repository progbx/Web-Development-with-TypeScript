import express from "express";
import cors from "cors";
import { contactsRouter } from "./contacts-resource/index.js";
 
export const app = express();
app.use(cors({ origin: "*" }));

app.use(express.json());

app.use("/", (req, res, next) => {
    if (req.originalUrl === "/") {
        res.send("Service is running!");
        return;
    }

    next();
});

app.use("/api/contacts", contactsRouter)
