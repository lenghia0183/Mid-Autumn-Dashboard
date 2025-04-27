import React from "react";
import Avatar from "./Avatar";

const TypingIndicator = ({ avatar }) => (
  <div className="flex items-start mb-4 justify-start">
    <Avatar image={avatar} />
    <div className="flex flex-col max-w-[75%]">
      <div className="bg-white p-3 rounded-lg shadow-md relative rounded-br-lg border border-gray-100">
        <div className="flex space-x-2">
          {[0, 300, 600].map((delay) => (
            <div
              key={delay}
              className="w-2 h-2 bg-emerald rounded-full animate-pulse"
              style={{
                animationDelay: `${delay}ms`,
                animationDuration: "1s",
              }}
            />
          ))}
        </div>
        <div className="absolute w-3 h-3 rotate-45 bg-white -left-1.5 top-[12px] border-b border-r border-gray-100"></div>
      </div>
      <div className="text-xs mt-1 text-gray-500 ml-2">
        {new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>
    </div>
  </div>
);

export default TypingIndicator;
