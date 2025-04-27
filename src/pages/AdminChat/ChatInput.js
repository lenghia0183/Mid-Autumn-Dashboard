import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../../components/Button";
import Icon from "../../components/Icon";
import { useAdminChat } from "../../context/adminChatContext";

const ChatInput = () => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState("");
  const { sendMessage, sendAdminTyping, sendAdminStopTyping, selectedUserId } =
    useAdminChat();

  const handleSendMessage = () => {
    if (inputValue.trim() && selectedUserId) {
      sendMessage(inputValue);
      setInputValue("");
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    sendAdminTyping();
  };

  const handleInputBlur = () => {
    sendAdminStopTyping();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendAdminStopTyping();
      handleSendMessage();
    }
  };

  return (
    <div className="p-4 border-t border-gray-200 bg-gray-50">
      <div
        className="flex items-center bg-white rounded-full border border-gray-200 pr-2 overflow-hidden shadow-md hover:shadow-lg focus-within:ring-2 focus-within:ring-emerald focus-within:ring-opacity-50 transition-all"
        style={{ backgroundColor: "rgba(245, 245, 245, 0.9)" }}
      >
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={handleInputBlur}
          placeholder={t("chat.typingMessage") || "Nhập tin nhắn của bạn..."}
          className="flex-1 bg-transparent py-3 px-4 focus:outline-none text-gray-700"
          disabled={!selectedUserId}
        />
        <Button
          onClick={handleSendMessage}
          className="rounded-full w-10 h-10 flex items-center justify-center shadow-sm hover:shadow transition-all"
          bgColor="gray-100"
          textColor={
            inputValue.trim() && selectedUserId ? "gray-500" : "gray-400"
          }
          disabled={!inputValue.trim() || !selectedUserId}
        >
          <Icon name="send" size="1.2" className="" />
        </Button>
      </div>
    </div>
  );
};

export default React.memo(ChatInput);
