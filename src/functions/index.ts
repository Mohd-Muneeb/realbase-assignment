export function convertTime(time: string) {
  const dateString: string | undefined = time.split(" ")[0];
  if (dateString === undefined) {
    return "No time found";
  }
  const [day, month, year] = dateString.split("/");
  const [hours, seconds]: string[] | undefined = time.split(" ")[1]?.split(":");
  if (day === undefined || month === undefined || year === undefined) {
    return "Error occured";
  }

  const dateObj = new Date(+year, +month - 1, +day);

  const diff = new Date() - new Date(+year, +month - 1, +day, +hours, +seconds);

  return `${convertMinutes(Math.floor(diff / 1000 / 60))} ago`;
}

function convertMinutes(minutes: number) {
  const MINUTES_PER_WEEK = 7 * 24 * 60;
  const MINUTES_PER_MONTH = 30 * 24 * 60;
  const MINUTES_PER_YEAR = 365 * 24 * 60;

  if (minutes >= MINUTES_PER_YEAR) {
    const years = Math.floor(minutes / MINUTES_PER_YEAR);
    return years === 1 ? `${years} year` : `${years} years`;
  } else if (minutes >= MINUTES_PER_MONTH) {
    const months = Math.floor(minutes / MINUTES_PER_MONTH);
    return months === 1 ? `${months} month` : `${months}  months`;
  } else if (minutes >= MINUTES_PER_WEEK) {
    const weeks = Math.floor(minutes / MINUTES_PER_WEEK);
    return weeks === 1 ? `${weeks} week` : `${weeks} weeks`;
  } else {
    return minutes === 1 ? `${minutes} minute` : `${minutes} minutes`;
  }
}
