export const getMessageTime = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export const getMessageDate = (timestamp, t) => {
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

export const shouldShowDate = (curr, prev) => {
  if (!prev) return true;
  const currentDate = new Date(curr);
  const previousDate = new Date(prev);
  return currentDate.toDateString() !== previousDate.toDateString();
};

export const getSenderRole = (sender) =>
  typeof sender === "object" ? sender.role : sender;
