export default function convertTime(dateString: string): string {
  const now = Date.now();
  const providedDate = Date.parse(dateString);
  const diff = Math.abs(now - providedDate);

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  if (now < providedDate) {
    return "In the future";
  }

  for (const interval of intervals) {
    const count = Math.floor(diff / (interval.seconds * 1000));
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
    }
  }

  return "Just now";
}
