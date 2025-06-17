export const dateFormat = (date) => {
  if (!date) return "";

  return new Date(date).toLocaleString("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
};
