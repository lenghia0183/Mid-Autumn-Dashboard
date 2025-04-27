import React, { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import Icon from "../../components/Icon";
import Image from "../../components/Image";
import images from "../../asset/images";
import { useAdminChat } from "../../context/adminChatContext";
import ChatInput from "./ChatInput";

const AdminChatArea = () => {
  const { t } = useTranslation();
  const { messages, isUserTyping, selectedUserId, chats } = useAdminChat();
  const messageAreaRef = useRef(null);
  const messagesEndRef = useRef(null);

  const selectedChat = chats.find((chat) => chat.userId._id === selectedUserId);

  const chatUser = selectedChat?.userId || {};

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isUserTyping]);

  const getSenderRole = (sender) =>
    typeof sender === "object" ? sender.role : sender;

  const getAvatar = (message) => {
    if (message?.sender?.avatar) return message.sender.avatar;
    if (getSenderRole(message.sender) === "user") {
      return chatUser?.avatar || images.fallBack;
    }
    return images.adminAvatar || images.fallBack;
  };

  const getMessageTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const getMessageDate = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return t("chat.today");
    if (date.toDateString() === yesterday.toDateString())
      return t("chat.yesterday");
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const shouldShowDate = (curr, prev) => {
    if (!prev) return true;
    const currentDate = new Date(curr);
    const previousDate = new Date(prev);
    return currentDate.toDateString() !== previousDate.toDateString();
  };

  const MessageBubble = ({ message, isUser }) => (
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

  const Avatar = ({ image }) => (
    <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 shadow-md border-2 border-white mt-1 mx-2">
      {image ? (
        <Image
          src={image}
          width="w-full"
          height="h-full"
          className="object-cover"
        />
      ) : (
        <div className="bg-emerald flex items-center justify-center w-full h-full">
          <Icon name="user" color="white" size="1.2" />
        </div>
      )}
    </div>
  );

  const TypingIndicator = () => (
    <div className="flex items-start mb-4 justify-start">
      <Avatar image={chatUser?.avatar || images.fallBack} />
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

  // If no chat is selected, show a placeholder
  if (!selectedUserId) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-gray-50 p-4">
        <div className="w-20 h-20 rounded-full bg-emerald/20 flex items-center justify-center mb-4 shadow-lg p-5">
          <Icon name="message-circle" color="emerald" size="2.5" />
        </div>
        <h3 className="text-xl font-medium text-gray-700 mb-2">
          {t("chat.selectConversation")}
        </h3>
        <p className="text-gray-500 text-center max-w-md">
          {t("chat.selectConversationDescription")}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="p-4 border-b border-gray-200 flex items-center bg-white shadow-sm">
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md mr-3">
          <Image
            src={chatUser?.avatar || images.fallBack}
            width="w-full"
            height="h-full"
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="font-medium">
            {chatUser?.fullname || t("chat.anonymousUser")}
          </h3>
          <div className="flex items-center text-sm">
            <span
              className={clsx("w-2 h-2 rounded-full mr-2", {
                "bg-green-500": selectedChat?.isOnline,
                "bg-gray-400": !chatUser?.isOnline,
              })}
            ></span>
            <span className="text-gray-500">
              {selectedChat?.isOnline ? t("chat.online") : t("chat.offline")}
            </span>
          </div>
        </div>
      </div>

      {/* Messages area */}
      <div
        ref={messageAreaRef}
        className="flex-1 overflow-y-auto p-4 bg-gray-50"
        style={{
          backgroundImage: `url(${images.commentBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "overlay",
          backgroundColor: "rgba(255, 255, 255, 0.92)",
          boxShadow: "inset 0 0 20px rgba(0, 0, 0, 0.05)",
        }}
      >
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <div className="w-20 h-20 rounded-full bg-emerald/20 flex items-center justify-center mb-4 shadow-lg p-5 animate-pulse">
              <Icon name="send" color="emerald" size="2.5" />
            </div>
            <div className="text-center">{t("chat.startConversation")}</div>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <React.Fragment key={message._id || message.id || index}>
                {shouldShowDate(
                  message.createdAt || message.timestamp,
                  messages[index - 1]?.createdAt ||
                    messages[index - 1]?.timestamp
                ) && (
                  <div className="flex justify-center my-4">
                    <div className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full shadow-sm">
                      {getMessageDate(message.createdAt || message.timestamp)}
                    </div>
                  </div>
                )}
                <MessageBubble
                  message={message}
                  isUser={getSenderRole(message.sender) === "user"}
                />
              </React.Fragment>
            ))}
            {isUserTyping && <TypingIndicator />}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat input */}
      <ChatInput />
    </div>
  );
};

export default AdminChatArea;
