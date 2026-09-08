import { MongoClient } from "mongodb";
import dotenv from "dotenv";

// Student Number: u25004141
dotenv.config();
let client;
let db;

async function connectDB() {
    const uri = process.env.MONGO_URI;
    client = new MongoClient(uri);
    await client.connect();
    db = client.db("photoShareDB");
    console.log("Connected to MongoDB");
}

function getDB() {
    return db;
}

export { connectDB, getDB };