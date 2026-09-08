import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB, getDB } from "./db.js";

// Student Number: u25004141

dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get("/api/posts", async (req, res) => {
    try {
        const db = getDB();
        const collection = db.collection("posts");
        const posts = await collection.find({}).toArray();
        console.log("Posts Found")
        res.status(200).json(posts);
    }
    catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({
            message: "Failed to retrieve posts",
            error: error.message
        });
    }
});

app.post("/api/posts", async (req, res) => {
    const { username, caption } = req.body;

    if (!username || !caption) {
        return res.status(400).json({
            message: "Username and caption are required"
        });
    }

    const trimmedUsername = username.trim();
    const trimmedCaption = caption.trim();

    if (!trimmedUsername || !trimmedCaption) {
        return res.status(400).json({
            message: "Username and caption are required"
        });
    }

    try {
        const db = getDB();
        const collection = db.collection("posts");
        const newPost = { trimmedUsername, trimmedCaption };
        const result = await collection.insertOne(newPost);
        res.json({
            _id: result.insertedId,
            ...newPost
        });
    } catch (error) {
        console.error("Error adding post:", error);
        res.status(500).json({
            message: "Failed to add post",
            error: error.message
        });
    }
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