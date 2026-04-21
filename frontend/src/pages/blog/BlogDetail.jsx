import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import "./BlogDetail.css";
import { Helmet } from "react-helmet";

const API_URL = import.meta.env.VITE_API_URL; // Update this with your backend URL

const BlogDetail = () => {
  const { slug } = useParams(); // Get the slug from the URL
  const location = useLocation();
  const navigate = useNavigate();

  // 1. Try to use data passed from the dashboard click (Instant Load)
  const [post, setPost] = useState(location.state?.post || null);
  const [loading, setLoading] = useState(!location.state?.post);
  const [error, setError] = useState(null);

  // 2. If no data (e.g., user refreshed page), fetch from API
  useEffect(() => {
    if (post) return; // If we already have the post, stop here.

    const fetchPost = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${API_URL}/api/blogs/display/${slug}`,
          {
            headers: { authorization: token },
          },
        );
        setPost(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Could not load the story.");
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug, post]);

  if (error) return <div className="detail-error">{error}</div>;
  if (!loading && !post)
    return <div className="detail-error">Post not found</div>;

  // console.log(post);

  return (
    <div id="blog-detail-page" className="blog-detail-wrapper">
      <button onClick={() => navigate("/blogs")} className="back-link">
        ← Back to Blogs
      </button>

      <Helmet>
        <title>{post?.title || "Loading story..."}</title>
      </Helmet>

      <article className="blog-article">
        <header className="article-header">
          <h1 className="article-title">{post?.title}</h1>

          <div className="article-meta">
            <span className="author-name">By {post?.author}</span>
            {post?.createdAt && (
              <span className="publish-date">
                • Published on {new Date(post.createdAt).toLocaleDateString()}
              </span>
            )}
          </div>
        </header>

        {/* The Full Content */}
        <div className="article-content">
          <ReactMarkdown>{post?.content || ""}</ReactMarkdown>
        </div>
      </article>
    </div>
  );
};

export default BlogDetail;
