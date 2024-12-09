/**
 * Given a date string in the format "YYYY-MM-DD", return the corresponding
 * day of the week, e.g. "Mon", "Tue", etc.
 * @param {string} dateStr - the date string
 * @returns {string} the weekday
 */
export function formatDay(dateStr) {
  return new Intl.DateTimeFormat("en", {
    weekday: "short",
  }).format(new Date(dateStr));
}