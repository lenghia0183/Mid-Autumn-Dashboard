import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import Image from "../../components/Image";
import Icon from "../../components/Icon";
import images from "../../asset/images";
import { useAdminChat } from "../../context/adminChatContext";

const UserList = () => {
  const { t } = useTranslation();
  const { chats, selectedChatId, setSelectedChatId } = useAdminChat();
  const [searchTerm, setSearchTerm] = useState("");

  console.log("chats", chats);

  const filteredChats = chats.filter((chat) => {
    const userName = chat.userId?.fullname || "";
    return userName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const formatLastMessageTime = (timestamp) => {
    if (!timestamp) return "";

    const date = new Date(timestamp);
    const now = new Date();
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (diffInDays === 1) {
      return t("chat.yesterday");
    } else if (diffInDays < 7) {
      return date.toLocaleDateString([], { weekday: "short" });
    } else {
      return date.toLocaleDateString([], { day: "2-digit", month: "2-digit" });
    }
  };

  const getLastMessage = (chat) => {
    if (!chat.messages || chat.messages.length === 0) return "";
    const lastMessage = chat.messages[chat.messages.length - 1];
    return lastMessage.content;
  };

  const getLastMessageTime = (chat) => {
    if (!chat.messages || chat.messages.length === 0) return "";
    const lastMessage = chat.messages[chat.messages.length - 1];
    return formatLastMessageTime(
      lastMessage.createdAt || lastMessage.timestamp
    );
  };

  return (
    <div className="flex flex-col h-full border-r border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold mb-4">
          {t("chat.conversations")}
        </h2>
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t("chat.searchUsers")}
            className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald"
          />
          <Icon
            name="search"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size="1.2"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredChats.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-4 text-gray-500">
            <Icon name="users" size="3" className="mb-2" />
            <p>{t("chat.noConversations")}</p>
          </div>
        ) : (
          filteredChats.map((chat) => (
            <div
              key={chat._id}
              className={clsx(
                "flex items-center p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors",
                {
                  "bg-emerald/10": selectedChatId === chat._id,
                }
              )}
              onClick={() => setSelectedChatId(chat._id)}
            >
              <div className="relative">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md">
                  <Image
                    src={chat.userId?.avatar || images.fallBack}
                    width="w-full"
                    height="h-full"
                    className="object-cover"
                  />
                </div>
                {chat.user?.isOnline && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>

              <div className="ml-3 flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-gray-900 truncate">
                    {chat.userId?.fullname || t("chat.anonymousUser")}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {getLastMessageTime(chat)}
                  </span>
                </div>
                <p className="text-sm text-gray-500 truncate">
                  {getLastMessage(chat)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserList;
