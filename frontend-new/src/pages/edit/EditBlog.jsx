import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Helmet } from "react-helmet";
import axios from "axios";
import "./EditBlog.css";

const API_URL = import.meta.env.VITE_API_URL;

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
        { headers: { authorization: token } }
      );

      alert("Blog edited successfully.");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Error editing post");
    }
  };

  const backDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <>
      <Helmet>
        <title>Edit Blogs</title>
      </Helmet>
      <div id="edit-post-wrapper" className="create-container">
        <h1 style={{ marginBottom: "20px", fontSize: "2rem" }}>
          Edit the Blog
        </h1>

        <form onSubmit={handleEdit}>
          <div className="form-group">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-input"
              placeholder="Enter a catchy title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Content</label>

            <div className="editor-tabs">
              <button
                type="button"
                className={`tab-btn ${activeTab === "write" ? "active" : ""}`}
                onClick={() => setActiveTab("write")}
              >
                Write
              </button>
              <button
                type="button"
                className={`tab-btn ${activeTab === "preview" ? "active" : ""}`}
                onClick={() => setActiveTab("preview")}
              >
                Preview
              </button>
            </div>

            {activeTab === "write" ? (
              <textarea
                className="markdown-input"
                placeholder="Write your story here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            ) : (
              <div className="markdown-preview">
                {content ? (
                  <ReactMarkdown>{content}</ReactMarkdown>
                ) : (
                  <p style={{ color: "#9ca3af" }}>Nothing to preview yet...</p>
                )}
              </div>
            )}
          </div>
          <button type="submit" className="submit-btn">
            Publish Post
          </button>
        </form>
        <button className="back-btn" onClick={backDashboard}>
          Back
        </button>
      </div>
    </>
  );
}

export default EditBlog;
