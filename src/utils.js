import * as moment from 'moment';
import * as pluralize from 'pluralize';

/**
 * Gets readable time from Date
 * @param {Date} time 
 */
export function getReadableTime(time) {
  return moment(time).format('LLLL');
}

/**
 * Gets readable time difference from two Dates
 * @param {} param0 Object with start and now Dates
 */
export function getReadableTimeDifference({ start, now }) {
  start = start || Date.now();
  now = now || Date.now();

  const diff = moment.duration(now - start);

  const minutes = diff.minutes();
  const hours = diff.hours();
  const days = diff.days();

  if (days > 7) {
    return moment(start).format('LL');
  } else if (days > 0) {
    return `Updated ${days} ${pluralize('day', days)} ago`;
  } else if (hours > 0) {
    return `Updated ${hours} ${pluralize('hour', hours)} ago`;
  } else if (minutes > 0) {
    return `Updated ${minutes} ${pluralize('minute', minutes)} ago`;
  } else {
    return `Updated less than a minute ago`;
  }
}