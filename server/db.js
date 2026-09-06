import { MongoClient } from "mongodb";

// Student Number: uXXXXXXX

let client;
let db;

async function connectDB() {
    const uri = process.env.MONGO_URI;

    client = new MongoClient(uri);

    // TODO: Connect to MongoDB

    // TODO: Store the PhotoShare database in db
}

function getDB() {
    // TODO: Return the database
}

export { connectDB, getDB };