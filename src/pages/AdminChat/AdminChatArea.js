import React, { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import images from "../../asset/images";
import { useAdminChat } from "../../context/adminChatContext";
import ChatInput from "./ChatInput";

import { getMessageDate, shouldShowDate, getSenderRole } from "../../utils/chatUtils";

import MessageBubble from "../../components/chat/MessageBubble";
import TypingIndicator from "../../components/chat/TypingIndicator";
import ChatHeader from "../../components/chat/ChatHeader";
import EmptyChat from "../../components/chat/EmptyChat";
import NoChatSelected from "../../components/chat/NoChatSelected";

const AdminChatArea = () => {
    const { t } = useTranslation();
    const { messages, isUserTyping, selectedUserId, chats } = useAdminChat();
    const messageAreaRef = useRef(null);
    const messagesEndRef = useRef(null);

    const selectedChat = chats.find((chat) => chat?.userId?._id === selectedUserId);
    const chatUser = selectedChat?.userId || {};

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isUserTyping]);

    const getAvatar = (message) => {
        if (message?.sender?.avatar) return message.sender.avatar;
        if (getSenderRole(message.sender) === "user") {
            return chatUser?.avatar || images.fallBack;
        }
        return images.adminAvatar || images.fallBack;
    };

    if (!selectedUserId) {
        return <NoChatSelected />;
    }

    const messageAreaStyle = {
        backgroundImage: `url(${images.commentBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "overlay",
        backgroundColor: "rgba(255, 255, 255, 0.92)",
        boxShadow: "inset 0 0 20px rgba(0, 0, 0, 0.05)",
    };

    return (
        <div className="flex flex-col h-full">
            {/* Chat header */}
            <ChatHeader chatUser={chatUser} isOnline={selectedChat?.isOnline} fallbackImage={images.fallBack} />

            {/* Messages area */}
            <div ref={messageAreaRef} className="flex-1 overflow-y-auto p-4 bg-gray-50" style={messageAreaStyle}>
                {messages.length === 0 ? (
                    <EmptyChat />
                ) : (
                    <>
                        {messages.map((message, index) => (
                            <React.Fragment key={message._id || message.id || index}>
                                {/* Date separator */}
                                {shouldShowDate(
                                    message.createdAt || message.timestamp,
                                    messages[index - 1]?.createdAt || messages[index - 1]?.timestamp,
                                ) && (
                                    <div className="flex justify-center my-4">
                                        <div className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full shadow-sm">
                                            {getMessageDate(message.createdAt || message.timestamp, t)}
                                        </div>
                                    </div>
                                )}

                                {/* Message bubble */}
                                <MessageBubble
                                    message={message}
                                    isUser={getSenderRole(message.sender) === "user"}
                                    getAvatar={getAvatar}
                                />
                            </React.Fragment>
                        ))}

                        {/* Typing indicator */}
                        {isUserTyping && <TypingIndicator avatar={chatUser?.avatar || images.fallBack} />}
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
