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
            {posts.map((post) => (
                <PostCard key={post._id} post={post} />
            ))}
        </section>
    );
}

function AddPostForm({ onAddPost }) {
    const [username, setUsername] = useState("");
    const [caption, setCaption] = useState("");
    const [formError, setFormError] = useState("");

    function handleSubmit(event) {
        event.preventDefault();

        if (!username.trim() || !caption.trim()) {
            setFormError("Both username and caption are required.");
            return;
        }

        setFormError("");

        onAddPost({
            username: username.trim(),
            caption: caption.trim()
        });

        setUsername("");
        setCaption("");
    }

    return (
        <form className="add-post-form" onSubmit={handleSubmit}>
            <h2>Add Post</h2>
            {formError && <p className="error">{formError}</p>}
            <label htmlFor="username">Username</label>
            <input
                id="username"
                type="text"
                placeholder="@username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <label htmlFor="caption">Caption</label>
            <textarea
                id="caption"
                placeholder="What would you like to share?"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
            />

            <button type="submit">Add Post</button>
        </form>
    );
}

function App() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        fetch("http://localhost:3001/api/posts")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setPosts(data);
                setLoading(false);
                console.log(`Loaded ${data.length} posts`);
            })
            .catch((error) => {
                console.error("Error fetching posts:", error);
                setError("Failed to load posts. Please try again.");
                setLoading(false);
            });
    }, []);

    const handleAddPost = (newPostData) => {
        setError(null);
        fetch("http://localhost:3001/api/posts", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPostData),
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then(err => {
                        throw new Error(err.message || 'Failed to add post');
                    });
                }
                return response.json();
            })
            .then((createdPost) => {
                setPosts((prevPosts) => [...prevPosts, createdPost]);
                console.log(`Added post: ${createdPost.username}`);
            })
            .catch((error) => {
                console.error("Error adding post:", error);
                setError(error.message || "Failed to add post. Please try again.");
            });
    };

    if (loading) {
        return (
            <div className="container">
                <h1>PhotoShare</h1>
                <p className="message">Loading posts...</p>
            </div>
        );
    }

    return (
        <main className="container">
            <h1>PhotoShare</h1>
            {error && <p className="error">{error}</p>}
            <AddPostForm onAddPost={handleAddPost}  />
            <h2>Posts</h2>
            <PostList posts={posts} />
        </main>
    );
}

export default App;