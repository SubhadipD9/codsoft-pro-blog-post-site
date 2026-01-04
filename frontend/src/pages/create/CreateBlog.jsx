import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import "./CreateBlog.css";

const API_URL = import.meta.env.VITE_API_URL;

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(""); // Stores the Markdown
  const [activeTab, setActiveTab] = useState("write"); // 'write' or 'preview'
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    // const author = localStorage.getItem("username");

    try {
      await axios.post(
        `${API_URL}/api/blogs/add`,
        { title, content },
        { headers: { authorization: token } }
      );
      alert("Post created successfully!");
      navigate("/dashboard"); // Go back to dashboard
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      alert("Error creating post");
    }
  };

  const backDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <>
      <Helmet>
        <title>Create Post</title>
      </Helmet>
      <div id="create-post-wrapper" className="create-container">
        <h1 style={{ marginBottom: "20px", fontSize: "2rem" }}>
          Write a Story
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Title Input */}
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

          {/* Markdown Editor */}
          <div className="form-group">
            <label className="form-label">Content</label>

            {/* Tab Switcher */}
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

            {/* Conditional Rendering based on Tab */}
            {activeTab === "write" ? (
              <textarea
                className="markdown-input"
                placeholder="Write your story here... Use # for headings, ** for bold."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            ) : (
              <div className="markdown-preview">
                {/* This converts the markdown text to HTML */}
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
};

export default CreatePost;
