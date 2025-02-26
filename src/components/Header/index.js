import React, { useState, useEffect } from "react";

const fakeUser = {
  name: "Nguyễn Văn A",
  avatar: "https://i.pravatar.cc/150?img=3",
};

const Header = ({ onLogin, onLogout }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);

  const timeString = currentTime.toLocaleTimeString();
  const dateString = currentTime.toLocaleDateString("vi-VN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header
      className="flex justify-between items-center p-4 bg-white-400 text-white shadow-lg"
      style={{
        background: "linear-gradient(30deg,#000000 -70%, #292929 60%)",
      }}
    >
      <div className="flex flex-col">
        <span className="text-lg font-semibold">{timeString}</span>
        <span className="text-sm">{dateString}</span>
      </div>

      <div className="flex items-center gap-4">
        {fakeUser ? (
          <>
            <span className="text-lg">Xin chào {fakeUser.name}</span>
            <img
              src={fakeUser.avatar}
              alt={fakeUser.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <button
              onClick={onLogout}
              className="px-4 py-2 bg-red-500 rounded hover:bg-red-600 transition-colors duration-200"
            >
              Đăng xuất
            </button>
          </>
        ) : (
          <button
            onClick={onLogin}
            className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 transition-colors duration-200"
          >
            Đăng nhập
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
