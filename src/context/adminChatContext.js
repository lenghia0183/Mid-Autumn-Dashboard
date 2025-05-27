import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useSocket } from "../hooks/useSocket";
import { getLocalStorageItem } from "../utils";
import { useGetAdminChat, useGetChatById } from "../service/https/chat";

const AdminChatContext = createContext();

export const AdminChatProvider = ({ children }) => {
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [isUserTyping, setIsUserTyping] = useState(false);
    const { socket, emit, on, off } = useSocket(getLocalStorageItem("token"));

    const { data: chatsData, mutate: refreshChats } = useGetAdminChat();

    const { data: chatData, mutate: refreshChat } = useGetChatById(selectedUserId);

    useEffect(() => {
        if (chatData) {
            setMessages(chatData?.messages || []);
        }
    }, [chatData]);

    useEffect(() => {
        if (!socket || !selectedUserId) return;

        socket.emit("chat:join", { userId: selectedUserId });

        return () => {
            socket.emit("chat:leave", { userId: selectedUserId });
        };
    }, [socket, selectedUserId]);

    const sendMessage = useCallback(
        (content) => {
            if (!content.trim() || !selectedUserId) return;

            emit("message:send", {
                content: content,
                userId: selectedUserId,
            });
        },
        [emit, selectedUserId],
    );

    const sendAdminTyping = useCallback(() => {
        if (!selectedUserId) return;

        emit("admin:typing", {
            userId: selectedUserId,
        });
    }, [emit, selectedUserId]);

    const sendAdminStopTyping = useCallback(() => {
        if (!selectedUserId) return;

        emit("admin:stop-typing", {
            userId: selectedUserId,
        });
    }, [emit, selectedUserId]);

    useEffect(() => {
        if (!socket) return;

        const handleNewMessage = (data) => {
            console.log("New message received:", data);

            const messageData = data.message || data;

            const newMessage = {
                _id: messageData._id || Date.now().toString(),
                content: messageData.content,
                sender: messageData?.sender,
                status: messageData.status || "sent",
                createdAt: messageData.createdAt || new Date().toISOString(),
                updatedAt: messageData.updatedAt || new Date().toISOString(),
            };

            setMessages((prev) => [...prev, newMessage]);

            refreshChats();
        };

        const handleUserTyping = () => {
            setIsUserTyping(true);
        };

        const handleUserStopTyping = () => {
            setIsUserTyping(false);
        };

        on("message:new", handleNewMessage);
        on("user:typing", handleUserTyping);
        on("user:stop-typing", handleUserStopTyping);

        return () => {
            off("message:new", handleNewMessage);
            off("user:typing", handleUserTyping);
            off("user:stop-typing", handleUserStopTyping);
        };
    }, [socket, on, off, refreshChats]);

    return (
        <AdminChatContext.Provider
            value={{
                selectedUserId,
                setSelectedUserId,
                messages,
                sendMessage,
                sendAdminTyping,
                sendAdminStopTyping,
                isUserTyping,
                chats: chatsData?.data || [],
                refreshChats,
                refreshChat,
            }}
        >
            {children}
        </AdminChatContext.Provider>
    );
};

export const useAdminChat = () => {
    const context = useContext(AdminChatContext);
    if (!context) {
        throw new Error("useAdminChat must be used within an AdminChatProvider");
    }
    return context;
};
