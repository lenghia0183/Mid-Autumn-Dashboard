import React from "react";
import { useTranslation } from "react-i18next";
import UserList from "./UserList";
import AdminChatArea from "./AdminChatArea";
import { AdminChatProvider } from "../../context/adminChatContext";

const AdminChat = () => {
  const { t } = useTranslation();

  return (
    <AdminChatProvider>
      <div className="flex flex-col h-full">
        <div className="mb-4">
          <h1 className="text-2xl font-bold">{t("chat.adminChat")}</h1>
          <p className="text-gray-500">{t("chat.adminChatDescription")}</p>
        </div>

        <div className="flex flex-1 border border-gray-200  max-h-[calc(100vh-200px)] min-h-[calc(100vh-200px)] rounded-lg overflow-hidden shadow-lg">
          <div className="w-1/3 bg-white  ">
            <UserList />
          </div>

          <div className="w-2/3 bg-white overflow-hidden">
            <AdminChatArea />
          </div>
        </div>
      </div>
    </AdminChatProvider>
  );
};

export default AdminChat;
