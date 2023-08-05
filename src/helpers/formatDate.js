export const formatDate = (timestamp) => {
  const date = new Date(timestamp.seconds * 1000);

  const options = {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  };

  return date.toLocaleString("en-US", options);
};
