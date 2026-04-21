import React from "react";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import "./BlogsCard.css";
import { Skeleton } from "boneyard-js/react";
import "../../bones/registry";

const BlogsCard = ({ post, loading }) => {
  const navigate = useNavigate();

  // Function to open the full blog post
  const handleReadFull = () => {
    if (loading) return;
    navigate(`/blog`, { state: { post } });
  };
  // const handleReadFull = () => {
  //   navigate(`/blog/${post.slug}`);
  // };

  return (
    // The entire card is now clickable

    <Skeleton
      name="blogs-card"
      loading={loading}
      color="rgba(0,0,0,0.08)"
      // Uncomment this if you want dark mode support!
      // darkColor="rgba(255,255,255,0.06)"
      animate="pulse"
      transition={true}
      stagger={true}
    >
      <article className="post-card" onClick={handleReadFull}>
        <div className="post-header">
          <h2 className="post-title">{post?.title || ""}</h2>
          <div className="post-meta">
            <span>By {post?.author || ""}</span>
            {/* Optional: Show date if available */}
            {post?.createdAt && (
              <span className="post-date">
                {" "}
                • {new Date(post.createdAt).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>

        <div className="post-content">
          {/* Show markdown preview */}
          <ReactMarkdown>{post?.content || ""}</ReactMarkdown>
        </div>

        {/* Visual cue that there is more to read */}
        <div className="read-more-hint">Read full story →</div>
      </article>
    </Skeleton>
  );
};

export default BlogsCard;
