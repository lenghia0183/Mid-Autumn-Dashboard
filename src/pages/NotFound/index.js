import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-orange-600 mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-gray-800 mb-2">
        Trang Không Tìm Thấy
      </h2>
      <p className="text-lg text-gray-600 mb-8 text-center max-w-lg">
        Rất tiếc, trang mà bạn đang tìm kiếm không tồn tại. Vui lòng kiểm tra
        lại đường dẫn hoặc quay lại trang chính.
      </p>
      <Link to="/">
        <button className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition">
          Quay Lại Trang Chính
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
