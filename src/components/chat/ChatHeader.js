import React from "react";
import clsx from "clsx";
import Image from "../Image";
import { useTranslation } from "react-i18next";

/**
 * Chat header component showing user info
 * @param {object} props - Component props
 * @param {object} props.chatUser - User object
 * @param {boolean} props.isOnline - Whether user is online
 * @param {string} props.fallbackImage - Fallback image URL
 * @returns {JSX.Element} Chat header component
 */
const ChatHeader = ({ chatUser, isOnline, fallbackImage }) => {
  const { t } = useTranslation();
  
  return (
    <div className="p-4 border-b border-gray-200 flex items-center bg-white shadow-sm">
      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md mr-3">
        <Image
          src={chatUser?.avatar || fallbackImage}
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
              "bg-green-500": isOnline,
              "bg-gray-400": !isOnline,
            })}
          ></span>
          <span className="text-gray-500">
            {isOnline ? t("chat.online") : t("chat.offline")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
