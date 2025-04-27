import React from "react";
import clsx from "clsx";
import Avatar from "./Avatar";
import { getMessageTime } from "../../utils/chatUtils";

const MessageBubble = ({ message, isUser, getAvatar }) => (
  <div
    className={clsx(
      "mb-4 flex items-start",
      isUser ? "justify-start" : "justify-end"
    )}
  >
    {isUser && <Avatar image={getAvatar(message)} />}
    <div className="flex flex-col max-w-[75%]">
      <div
        className={clsx(
          "p-3 rounded-lg shadow-md relative border border-gray-100",
          isUser
            ? "bg-white text-dark rounded-br-lg"
            : "bg-emerald text-white rounded-bl-lg"
        )}
      >
        <div className="text-sm whitespace-pre-wrap break-words">
          {message.content}
        </div>
        <div
          className={clsx(
            "absolute w-3 h-3 rotate-45",
            isUser
              ? "bg-white -left-1.5 top-[12px] border-b border-r border-gray-100"
              : "bg-emerald -right-1.5 top-[12px]"
          )}
        />
      </div>
      <div
        className={clsx(
          "text-xs mt-1 text-gray-500",
          isUser ? "ml-2" : "text-right mr-2"
        )}
      >
        {getMessageTime(message.createdAt || message.timestamp)}
      </div>
    </div>
    {!isUser && <Avatar image={getAvatar(message)} />}
  </div>
);

export default MessageBubble;
