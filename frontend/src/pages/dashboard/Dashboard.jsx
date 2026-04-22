import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PostCard from "../../components/Posts/PostCard";
import Navbar from "../../components/Navbar/Navbar";
import { Helmet } from "react-helmet";
import { BlogCardSkeleton } from "../../components/Skeleton/BlogCardSkeleton";

const API_URL = import.meta.env.VITE_API_URL;

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

  const deletePost = async (id) => {
    const token = localStorage.getItem("token");
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      await axios.delete(`${API_URL}/api/blogs/delete/${id}`, {
        headers: { authorization: token },
      });

      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
      alert("Post deleted successfully");
    } catch (err) {
      alert(
        "Failed to delete post: " +
          (err.response?.data?.message || err.message),
      );
    }
  };

  return (
    <div className="bg-white min-h-screen font-sans">
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Navbar />

      <div className="max-w-4xl mx-auto my-10 px-5">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-3">
            My Writings
          </h1>
        </div>

        {error && (
          <div className="bg-red-50 text-red-800 p-4 rounded-lg text-center border border-red-200 mb-5">
            {error}
          </div>
        )}

        {!loading && !error && posts.length === 0 && (
          <div className="text-center text-gray-500 mt-12 text-lg">
            <p>No posts found. Why not create one?</p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <BlogCardSkeleton key={`skeleton-${index}`} />
              ))
            : posts.map((post) => (
                <PostCard key={post._id} post={post} onDelete={deletePost} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
