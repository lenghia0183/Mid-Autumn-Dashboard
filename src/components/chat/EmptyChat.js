import React from "react";
import Icon from "../Icon";
import { useTranslation } from "react-i18next";

const EmptyChat = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center h-full text-gray-500">
      <div className="w-20 h-20 rounded-full bg-emerald/20 flex items-center justify-center mb-4 shadow-lg p-5 animate-pulse">
        <Icon name="send" color="emerald" size="2.5" />
      </div>
      <div className="text-center">{t("chat.startConversation")}</div>
    </div>
  );
};

export default EmptyChat;
