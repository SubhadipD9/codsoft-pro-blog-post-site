import React from "react";
import Skeleton from "@mui/material/Skeleton";

export const BlogCardSkeleton = () => {
  return (
    <div className="post-card" style={{ pointerEvents: "none" }}>
      <div className="post-header">
        <Skeleton
          variant="text"
          width="85%"
          sx={{ fontSize: "1.6rem", lineHeight: 1.3, mb: "8px" }}
        />
        <Skeleton variant="text" width="40%" sx={{ fontSize: "0.9rem" }} />
      </div>

      <div
        className="post-content"
        style={{ maskImage: "none", WebkitMaskImage: "none" }}
      >
        <Skeleton
          variant="text"
          width="100%"
          sx={{ fontSize: "1rem", lineHeight: 1.6 }}
        />
        <Skeleton
          variant="text"
          width="100%"
          sx={{ fontSize: "1rem", lineHeight: 1.6 }}
        />
        <Skeleton
          variant="text"
          width="95%"
          sx={{ fontSize: "1rem", lineHeight: 1.6 }}
        />
        <Skeleton
          variant="text"
          width="90%"
          sx={{ fontSize: "1rem", lineHeight: 1.6 }}
        />
      </div>

      <div className="read-more-hint" style={{ opacity: 1, transform: "none" }}>
        <Skeleton variant="text" width="120px" sx={{ fontSize: "0.9rem" }} />
      </div>
    </div>
  );
};
