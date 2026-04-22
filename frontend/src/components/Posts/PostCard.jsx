import React from "react";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

const PostCard = ({ post, onDelete }) => {
  const navigate = useNavigate();

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
    <article className="bg-white border border-gray-200/50 rounded-xl p-6 mb-6 shadow-sm transition-all duration-200 ease-in-out flex flex-col text-left text-gray-700 hover:-translate-y-0.5 hover:shadow-md">
      <div className="mb-4">
        <h2 className="text-2xl font-extrabold text-gray-900 m-0 mb-2 leading-snug">
          {post.title}
        </h2>
        <p className="text-sm text-gray-500 font-medium m-0">
          By {post.author}
        </p>
      </div>

      <div
        className="text-gray-700 leading-relaxed text-base mb-6 max-h-50 overflow-hidden relative 
                      after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-10 after:bg-linear-to-t after:from-white after:to-transparent
                      [&_p]:mb-2 
                      [&_strong]:font-bold [&_strong]:text-gray-900 
                      [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-2 
                      [&_h1]:text-lg [&_h1]:font-bold [&_h1]:mt-2 [&_h1]:mb-1 
                      [&_h2]:text-lg [&_h2]:font-bold [&_h2]:mt-2 [&_h2]:mb-1 
                      [&_h3]:text-lg [&_h3]:font-bold [&_h3]:mt-2 [&_h3]:mb-1"
      >
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>

      <div className="mt-auto flex gap-3 pt-4">
        <button
          className="px-4 py-2 rounded-md font-medium text-sm cursor-pointer border-none outline-none transition-all duration-200 no-underline bg-gray-900 text-white hover:bg-black hover:-translate-y-px"
          onClick={handleEdit}
        >
          Edit Post
        </button>
        <button
          className="px-4 py-2 rounded-md font-medium text-sm cursor-pointer border-none outline-none transition-colors duration-200 no-underline bg-red-50 text-red-600 hover:bg-red-100"
          onClick={() => onDelete(post._id)}
        >
          Delete
        </button>
      </div>
    </article>
  );
};

export default PostCard;
