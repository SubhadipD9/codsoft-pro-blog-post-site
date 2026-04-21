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
      }
    };

    fetchAllBlogs();
  }, []);

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        {/* 2. Error Display */}
        {error && <div className="error-message">{error}</div>}

        {/* 4. Grid Display */}
        <div className="posts-grid">
          {blogs.map((post) => (
            <BlogsCard key={post._id} post={post} loading={loading} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Blogs;
