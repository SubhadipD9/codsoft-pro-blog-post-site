/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { ShareButton } from "../../components/ShareButton/ShareButton";
import { Helmet } from "react-helmet";

const API_URL = import.meta.env.VITE_API_URL;

const CACHE_DURATION = 5 * 60 * 1000;
const CACHE_KEY = "blog_post_slug";

const getCachedPost = () => {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp > CACHE_DURATION) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }

    return data;
  } catch (e) {
    return null;
  }
};

const setCachedPost = (post) => {
  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({
        data: post,
        timestamp: Date.now(),
      }),
    );
  } catch (e) {
    console.warn("Cache storage full, skipping cache");
  }
};

const markdownComponents = {
  img: ({ src, alt, title }) => {
    if (!src) return null;

    return (
      <figure className="my-8">
        <img
          src={src}
          alt={alt || "Blog image"}
          title={title}
          loading="lazy"
          className="mx-auto block max-h-130 w-full rounded-xl border border-gray-200 bg-white object-contain shadow-sm"
        />
      </figure>
    );
  },
};

const BlogDetail = () => {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Use navigation state if available (instant render)
  const [post, setPost] = useState(location.state?.post || null);
  const [loading, setLoading] = useState(!location.state?.post);
  const [error, setError] = useState(null);

  // Back button
  const handleBackToBlogs = () => {
    navigate("/blogs");
  };

  // Always scroll to top when slug changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [slug]);

  // ✅ Fetch only if we don't already have post
  useEffect(() => {
    if (!slug) return;
    const cachedPost = getCachedPost();
    if (cachedPost) {
      setPost(cachedPost);
      setLoading(false);
      return;
    }

    if (post) {
      setLoading(false);
      return;
    }

    const fetchPost = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(`${API_URL}/api/blogs/display/${slug}`, {
          headers: { authorization: token },
        });

        setCachedPost(res.data.post);
        setPost(res.data.post);
      } catch (err) {
        console.error("Error fetching blog:", err.message, err.response?.data);
        setError(err.response?.data?.message || "Could not load the story.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  // Error state
  if (error) {
    return (
      <div className="mx-auto mt-10 max-w-200 px-5 text-center text-red-700">
        {error}
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="mx-auto mt-10 max-w-200 px-5 text-center text-gray-600">
        Loading...
      </div>
    );
  }

  // Not found state
  if (!post) {
    return (
      <div className="mx-auto mt-10 max-w-200 px-5 text-center text-red-700">
        Post not found
      </div>
    );
  }

  return (
    <div className="relative mx-auto min-h-screen max-w-200 px-5 py-10 text-gray-900">
      <Helmet>
        <title>{post?.title || "Loading story..."}</title>
      </Helmet>

      <button
        onClick={handleBackToBlogs}
        className="mb-7 text-gray-500 hover:text-gray-900 hover:underline"
      >
        ← Back to Blogs
      </button>

      <article>
        {/* 1. Added 'relative' to the header so the absolute share button sticks to it */}
        <header className="relative mb-10 border-b border-gray-200 pb-5">
          <h1 className="text-[2.5rem] font-extrabold leading-[1.3]">
            {post?.title || "Untitled"}
          </h1>

          <div className="text-sm text-gray-500">
            <span className="font-semibold text-gray-800 text-base">
              By {post?.author || "Unknown"}
            </span>

            {post?.createdAt && (
              <span> • {new Date(post.createdAt).toLocaleDateString()}</span>
            )}
          </div>

          {/* 2. Moved ShareButton INSIDE the header */}
          <ShareButton />
        </header>

        {/* Markdown content */}
        <div className="prose prose-lg prose-gray max-w-none">
          <ReactMarkdown components={markdownComponents}>
            {post?.content || "No content available"}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  );
};

export default BlogDetail;
