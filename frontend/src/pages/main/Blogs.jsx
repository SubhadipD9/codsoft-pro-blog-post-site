import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import BlogsCard from "../../components/BlogsCard/BlogsCard";
import "./Blogs.css";

const API_URL = import.meta.env.VITE_API_URL;

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        const response = await fetch(`${API_URL}/`, {
          method: "GET",
        });

        const data = await response.json();

        setBlogs(data.allPost);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError("Failed to load blogs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllBlogs();
  }, []);

  // 1. Add a loading indicator
  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        Loading stories...
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        {/* 2. Error Display */}
        {error && <div className="error-message">{error}</div>}

        {/* 4. Grid Display */}
        <div className="posts-grid">
          {blogs.map((post) => (
            <BlogsCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Blogs;
