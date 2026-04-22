import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import BlogsCard from "../../components/BlogsCard/BlogsCard";
import { BlogCardSkeleton } from "../../components/Skeleton/BlogCardSkeleton";

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
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError("Failed to load blogs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllBlogs();
  }, []);

  useEffect(() => {
    if (loading) return;

    const savedScrollY = sessionStorage.getItem("blogs-scroll-y");
    if (!savedScrollY) return;

    const y = Number(savedScrollY);
    if (Number.isFinite(y)) {
      requestAnimationFrame(() => {
        window.scrollTo({ top: y, left: 0, behavior: "auto" });
      });
    }

    sessionStorage.removeItem("blogs-scroll-y");
  }, [loading]);

  return (
    <>
      <div className="bg-white min-h-screen">
        <Navbar />

        {/* .dashboard-container -> max-w-[900px] mx-auto my-10 px-5 */}
        <div className="max-w-230 mx-auto my-10 px-5 font-sans">
          {/* Error Display */}
          {error && (
            <div className="bg-red-50 text-red-800 p-4 rounded-lg text-center border border-red-200 mb-5">
              {error}
            </div>
          )}

          {/* Grid Display */}
          <div className="grid grid-cols-1 gap-6">
            {loading
              ? /* Render 6 skeletons INSIDE the grid when loading */
                Array.from({ length: 6 }).map((_, index) => (
                  <BlogCardSkeleton key={`skeleton-${index}`} />
                ))
              : /* Render real cards when data is loaded */
                blogs.map((post) => <BlogsCard key={post._id} post={post} />)}
          </div>
        </div>
      </div>
    </>
  );
}

export default Blogs;
