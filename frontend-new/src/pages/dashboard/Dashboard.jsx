import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PostCard from "../../components/Posts/PostCard";
import Navbar from "../../components/Navbar/Navbar";
import { Helmet } from "react-helmet";
import "./Dashboard.css";

const API_URL = import.meta.env.VITE_API_URL; // Replace with your actual Config/URL

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleError = (err) => {
    if (err.response) {
      const { status } = err.response;
      if (status === 403) {
        alert("Session expired. Please sign in again.");
        localStorage.clear();
        navigate("/login");
      } else if (status === 404) {
        setError("You haven't written any posts yet.");
      } else {
        setError("Something went wrong while loading your posts.");
      }
    } else {
      setError("Server is unreachable.");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/blogs/userPost`, {
          headers: { authorization: token },
        });
        setPosts(response.data.userBlogs);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        handleError(err);
      }
    };

    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 3. Delete Logic
  const deletePost = async (id) => {
    const token = localStorage.getItem("token");
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      await axios.delete(`${API_URL}/api/blogs/delete/${id}`, {
        headers: { authorization: token },
      });

      // Optimistic Update: Remove from UI immediately
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
      alert("Post deleted successfully");
    } catch (err) {
      alert(
        "Failed to delete post: " + (err.response?.data?.message || err.message)
      );
    }
  };

  if (loading)
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>Loading...</div>
    );

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Navbar />
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1 className="dashboard-title">My Writings</h1>
        </div>

        {error && <div className="error-message">{error}</div>}

        {!loading && !error && posts.length === 0 && (
          <div className="empty-state">
            <p>No posts found. Why not create one?</p>
          </div>
        )}

        <div className="posts-grid">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} onDelete={deletePost} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
