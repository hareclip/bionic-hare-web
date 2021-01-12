
/**
 * Gets readable time difference from two Dates
 * @param {Date} start Start date
 * @param {Date} now Time now
 */
export function getReadableTimeDifference({ start, now }) {
  start = start || Date.now();
  now = now || Date.now();

  const diff = now - start;

  // TODO: use lib for dates and pluralize time

  if (diff < 60000) {
    return `Updated ${Math.floor(diff / 1000)} seconds ago`;
  } else if (diff < 3600000) {
    return `Updated ${Math.floor(diff / 60000)} minutes ago`;
  } else if (diff < 86400000) {
    return `Updated ${Math.floor(diff / 3600000)} hours ago`;
  }

  return start.toUTCString();
}