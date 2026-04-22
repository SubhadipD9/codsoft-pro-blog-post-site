import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { Helmet } from "react-helmet";

const API_URL = import.meta.env.VITE_API_URL; // Update this with your backend URL

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
  const { slug } = useParams(); // Get the slug from the URL
  const location = useLocation();
  const navigate = useNavigate();

  // 1. Try to use data passed from the dashboard click (Instant Load)
  const [post, setPost] = useState(location.state?.post || null);
  const [loading, setLoading] = useState(!location.state?.post);
  const [error, setError] = useState(null);

  const handleBackToBlogs = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }
    navigate("/blogs");
  };

  // Reset scroll so opening a blog always starts from the top.
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [slug]);

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

  if (error)
    return (
      <div className="mx-auto mt-10 max-w-200 px-5 text-center text-red-700">
        {error}
      </div>
    );
  if (!loading && !post)
    return (
      <div className="mx-auto mt-10 max-w-200 px-5 text-center text-red-700">
        Post not found
      </div>
    );

  // console.log(post);

  return (
    <div className="relative mx-auto min-h-screen max-w-200 bg-transparent px-5 py-10 font-sans text-gray-900">
      <button
        onClick={handleBackToBlogs}
        className="mb-7.5 inline-block w-auto appearance-none border-none bg-transparent p-0 text-left text-base font-medium text-gray-500 no-underline shadow-none transition-colors hover:text-gray-900 hover:underline"
      >
        ← Back to Blogs
      </button>

      <Helmet>
        <title>{post?.title || "Loading story..."}</title>
      </Helmet>

      <article>
        <header className="mb-10 flex w-full flex-col gap-4 border-b border-gray-200 pb-5">
          <h1 className="m-0 wrap-break-word text-[2.5rem] font-extrabold leading-[1.3] text-gray-900">
            {post?.title}
          </h1>

          <div className="mt-0 block text-base font-medium text-gray-500">
            <span className="font-semibold text-gray-900">
              By {post?.author}
            </span>
            {post?.createdAt && (
              <span>
                • Published on {new Date(post.createdAt).toLocaleDateString()}
              </span>
            )}
          </div>
        </header>

        {/* The Full Content */}
        <div
          className="mt-0 clear-both text-[1.15rem] leading-[1.8] text-gray-700
          [&_h1]:mt-8 [&_h1]:font-bold [&_h1]:text-gray-900
          [&_h2]:mt-8 [&_h2]:font-bold [&_h2]:text-gray-900
          [&_p]:mb-6
          [&_ul]:mb-6 [&_ul]:pl-5"
        >
          <ReactMarkdown components={markdownComponents}>
            {post?.content || ""}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  );
};

export default BlogDetail;
