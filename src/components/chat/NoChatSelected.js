import React from "react";
import Icon from "../Icon";
import { useTranslation } from "react-i18next";

const NoChatSelected = () => {
  const { t } = useTranslation();

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
};

export default NoChatSelected;
