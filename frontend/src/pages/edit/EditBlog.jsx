import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Helmet } from "react-helmet";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const markdownComponents = {
  img: ({ src, alt, title }) => {
    if (!src) return null;

    return (
      <figure className="my-6">
        <img
          src={src}
          alt={alt || "Blog image"}
          title={title}
          loading="lazy"
          className="mx-auto block max-h-130 w-full rounded-xl border border-gray-200 bg-white object-contain shadow-sm"
        />
        {(title || alt) && (
          <figcaption className="mt-2 text-center text-sm text-gray-500">
            {title || alt}
          </figcaption>
        )}
      </figure>
    );
  },
};

function EditBlog() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get the data from previous tab
  const data = location.state;

  // Initialize state directly from data.
  const [title, setTitle] = useState(data?.title || "");
  const [content, setContent] = useState(data?.content || "");
  const [activeTab, setActiveTab] = useState("write");

  useEffect(() => {
    // Safety check: If data is null, redirect.
    if (!data) {
      alert("No post selected to edit");
      navigate("/dashboard");
    }
  }, [data, navigate]);

  // If data is missing, don't render the form to prevent UI crashes while redirecting
  if (!data) return null;

  const handleEdit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.put(
        `${API_URL}/api/blogs/edit/${data._id}`,
        {
          title,
          content,
        },
        { headers: { authorization: token } },
      );

      alert("Blog edited successfully.");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Error editing post");
    }
  };

  const handleBackToBlogs = () => {
    navigate("/dashboard");
  };

  return (
    <>
      <Helmet>
        <title>Edit Blogs</title>
      </Helmet>
      <div className="mx-auto my-10 max-w-200 px-5 font-sans text-gray-900">
        <button
          onClick={handleBackToBlogs}
          className="mb-7.5 inline-block w-auto appearance-none border-none bg-transparent p-0 text-left text-base font-medium text-gray-500 no-underline shadow-none transition-colors hover:text-gray-900 hover:underline"
        >
          ← Back to Dashboard
        </button>
        <h1 className="mb-5 text-left text-[2rem] font-extrabold text-gray-900">
          Edit the Blog
        </h1>

        <form onSubmit={handleEdit}>
          <div className="mb-5 text-left">
            <label className="mb-2 block font-semibold text-gray-700">
              Title
            </label>
            <input
              type="text"
              className="w-full rounded-lg border border-gray-200 bg-white p-3 text-base text-gray-900 outline-none transition-colors focus:border-indigo-600"
              placeholder="Enter a catchy title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-5 text-left">
            <label className="mb-2 block font-semibold text-gray-700">
              Content
            </label>

            <div className="flex w-fit gap-1 rounded-t-lg border border-b-0 border-gray-200 bg-gray-100 p-1">
              <button
                type="button"
                className={`rounded-md border-none bg-transparent px-4 py-2 text-[0.9rem] font-medium transition-all ${
                  activeTab === "write"
                    ? "bg-white font-semibold text-indigo-600 shadow-sm"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("write")}
              >
                Write
              </button>
              <button
                type="button"
                className={`rounded-md border-none bg-transparent px-4 py-2 text-[0.9rem] font-medium transition-all ${
                  activeTab === "preview"
                    ? "bg-white font-semibold text-indigo-600 shadow-sm"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("preview")}
              >
                Preview
              </button>
            </div>

            {activeTab === "write" ? (
              <textarea
                className="min-h-100 w-full resize-y rounded-bl-lg rounded-br-lg rounded-tr-lg border border-gray-200 bg-white p-4 font-mono text-[0.95rem] leading-[1.6] text-gray-700 outline-none focus:border-indigo-600"
                placeholder="Write your story here... Use ![image title](https://cdn-image-url) for images."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            ) : (
              <div
                className="min-h-100 w-full overflow-y-auto rounded-bl-lg rounded-br-lg rounded-tr-lg border border-gray-200 bg-gray-50 p-6 text-left
                [&_blockquote]:border-l-4 [&_blockquote]:border-gray-200 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-500
                [&_code]:rounded [&_code]:bg-gray-200 [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.9em] [&_code]:text-rose-700
                [&_h1]:mb-4 [&_h1]:border-b [&_h1]:border-gray-200 [&_h1]:pb-1 [&_h1]:text-[1.8em] [&_h1]:font-bold [&_h1]:text-gray-900
                [&_h2]:mb-4 [&_h2]:mt-6 [&_h2]:border-b [&_h2]:border-gray-200 [&_h2]:pb-1 [&_h2]:text-[1.4em] [&_h2]:font-bold [&_h2]:text-gray-900
                [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-5
                [&_p]:mb-4 [&_p]:leading-[1.7] [&_p]:text-gray-700
                [&_pre]:mb-4 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-gray-800 [&_pre]:p-4 [&_pre]:text-white
                [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-inherit
                [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-5"
              >
                {content ? (
                  <ReactMarkdown components={markdownComponents}>
                    {content}
                  </ReactMarkdown>
                ) : (
                  <p className="text-gray-400">Nothing to preview yet...</p>
                )}
              </div>
            )}
          </div>
          <button
            type="submit"
            className="mt-5 w-full rounded-lg border-none bg-gray-900 px-4 py-3.5 text-base font-semibold text-white transition-all hover:-translate-y-px hover:bg-black"
          >
            Publish Post
          </button>
        </form>
      </div>
    </>
  );
}

export default EditBlog;
