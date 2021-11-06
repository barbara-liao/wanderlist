import parseDate from '../lib/parse-date';

export default function getRange(start, end) {
  const endDay = new Date(end);
  const startDay = new Date(start);
  const numDates = (endDay - startDay) / (1000 * 60 * 60 * 24);
  const dateArr = [];

  for (let i = 0; i < numDates + 1; i++) {
    const parsedDate = parseDate(startDay);
    const dateObj = { date: parsedDate };
    dateArr.push(dateObj);
    startDay.setDate(startDay.getDate() + 1);
  }

  return dateArr;
}
