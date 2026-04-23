import React from "react";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

const BlogsCard = ({ post, loading }) => {
  const navigate = useNavigate();

  // Function to open the full blog post
  const handleReadFull = () => {
    if (loading) return;
    sessionStorage.setItem("blogs-scroll-y", String(window.scrollY));
    navigate(`/blog/${post.slug}`, {
      state: {
        post,
      },
    });
  };

  return (
    // 'group' allows child elements (like the read-more hint) to react when the parent is hovered
    <article
      className="group bg-white border border-gray-200/50 rounded-xl p-6 shadow-sm transition-all duration-200 ease-in-out flex flex-col text-left text-gray-700 cursor-pointer relative hover:-translate-y-1 hover:shadow-xl hover:border-indigo-600"
      onClick={handleReadFull}
    >
      {/* Header */}
      <div className="mb-3">
        <h2 className="text-[1.6rem] font-extrabold text-gray-900 mb-2 leading-[1.3]">
          {post?.title || ""}
        </h2>
        <div className="text-sm text-gray-500 font-medium">
          <span>By {post?.author || ""}</span>
          {post?.createdAt && (
            <span className="ml-1">
              • {new Date(post.createdAt).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>

      {/* Content Preview */}
      <div
        className="text-gray-600 leading-relaxed text-base max-h-30 overflow-hidden relative 
                   mask-[linear-gradient(to_bottom,black_60%,transparent_100%)] 
                   [-webkit-mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)] 
                   [&_h1]:text-base [&_h1]:font-bold [&_h1]:m-0 [&_h1]:inline 
                   [&_h2]:text-base [&_h2]:font-bold [&_h2]:m-0 [&_h2]:inline 
                   [&_h3]:text-base [&_h3]:font-bold [&_h3]:m-0 [&_h3]:inline 
                   [&_img]:hidden"
      >
        <ReactMarkdown>{post?.content || ""}</ReactMarkdown>
      </div>

      {/* "Read More" Hint */}
      {/* opacity-0 hides it by default, group-hover:opacity-100 shows it when the card is hovered */}
      <div className="mt-4 text-sm font-semibold text-indigo-600 opacity-0 translate-y-1 transition-all duration-200 ease-in-out group-hover:opacity-100 group-hover:translate-y-0">
        Read full story →
      </div>
    </article>
  );
};

export default BlogsCard;
