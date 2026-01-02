import React from "react";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import "./BlogsCard.css";

const BlogsCard = ({ post }) => {
  const navigate = useNavigate();

  // Function to open the full blog post
  const handleReadFull = () => {
    navigate(`/blog`, { state: { post } });
  };

  return (
    // The entire card is now clickable
    <article className="post-card" onClick={handleReadFull}>
      <div className="post-header">
        <h2 className="post-title">{post.title}</h2>
        <div className="post-meta">
          <span>By {post.author}</span>
          {/* Optional: Show date if available */}
          {post.createdAt && (
            <span className="post-date">
              {" "}
              • {new Date(post.createdAt).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>

      <div className="post-content">
        {/* Show markdown preview */}
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>

      {/* Visual cue that there is more to read */}
      <div className="read-more-hint">Read full story →</div>
    </article>
  );
};

export default BlogsCard;
