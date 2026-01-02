import React from "react";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import "./PostCard.css";

const PostCard = ({ post, onDelete }) => {
  const navigate = useNavigate();

  // Handle Edit Navigation
  const handleEdit = () => {
    navigate(`/editblog`, {
      state: {
        _id: post._id,
        title: post.title,
        content: post.content,
      },
    });
  };

  return (
    <article className="post-card">
      <div className="post-header">
        <h2 className="post-title">{post.title}</h2>
        <p className="post-meta">By {post.author}</p>
      </div>

      {/* CHANGED: Using ReactMarkdown instead of dangerouslySetInnerHTML */}
      <div className="post-content">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>

      <div className="post-actions">
        <button className="btn btn-edit" onClick={handleEdit}>
          Edit Post
        </button>
        <button className="btn btn-delete" onClick={() => onDelete(post._id)}>
          Delete
        </button>
      </div>
    </article>
  );
};

export default PostCard;
