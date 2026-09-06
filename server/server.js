import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB, getDB } from "./db.js";

// Student Number: uXXXXXXX

dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get("/api/posts", async (req, res) => {
    // TODO: Retrieve all posts from MongoDB
});

app.post("/api/posts", async (req, res) => {
    // TODO: Validate and add a post to MongoDB
});

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Failed to connect to MongoDB:", error);
    });