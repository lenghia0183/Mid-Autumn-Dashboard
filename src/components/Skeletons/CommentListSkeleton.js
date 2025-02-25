import React from "react";
import clsx from "clsx";

const CommentListSkeleton = ({ count = 3, className }) => {
  return (
    <div className={clsx("mt-10 space-y-4", className)}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="mb-4 p-4 border border-gray-200 rounded shadow-md flex space-x-4 bg-white-100"
        >
          {/* Avatar Skeleton */}
          <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-full bg-gray-300 animate-pulse" />
          </div>
          {/* Content Skeleton */}
          <div className="flex-grow space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <div className="h-3 bg-gray-300 animate-pulse rounded w-32 mb-1" />
                <div className="h-3 bg-gray-300 animate-pulse rounded w-40" />
              </div>
              <div className="h-3 bg-gray-300 animate-pulse rounded w-20" />
            </div>
            <div className="h-3 bg-gray-300 animate-pulse rounded w-1/6" />
            <div className="h-8 bg-gray-300 animate-pulse rounded w-5/6" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentListSkeleton;
