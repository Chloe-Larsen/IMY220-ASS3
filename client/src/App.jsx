import { useState, useEffect } from "react";
import "./App.css";

// Student Number: u25004141

function PostCard({ post }) {
    return (
        <article className="post-card">
            <h2>{post.username}</h2>
            <p>{post.caption}</p>
        </article>
    );
}

function PostList({ posts }) {
    if (posts.length === 0) {
        return <p className="message">No posts yet.</p>;
    }

    return (
        <section className="post-list">
            {/* TODO: Display the posts using PostCard components */}
        </section>
    );
}

function AddPostForm() {
    // TODO: Create state for the username and caption

    function handleSubmit(event) {
        event.preventDefault();

        // TODO: Validate the form

        // TODO: Send the new post to the Express API
    }

    return (
        <form className="add-post-form" onSubmit={handleSubmit}>
            <h2>Add Post</h2>

            <label htmlFor="username">Username</label>
            <input
                id="username"
                type="text"
                placeholder="@username"
            />

            <label htmlFor="caption">Caption</label>
            <textarea
                id="caption"
                placeholder="What would you like to share?"
            />

            <button type="submit">Add Post</button>
        </form>
    );
}

function App() {
    // TODO: Create state for posts, loading and errors

    // TODO: Retrieve the posts when the application first loads

    return (
        <main className="container">
            <h1>PhotoShare</h1>

            <AddPostForm />

            <h2>Posts</h2>

            {/* TODO: Display loading and error messages */}

            {/* TODO: Display the PostList */}
        </main>
    );
}

export default App;