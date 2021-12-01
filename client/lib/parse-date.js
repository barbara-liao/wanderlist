export default function parseDate(rawDate) {
  const dt = new Date(rawDate);
  dt.setMinutes(dt.getMinutes() + dt.getTimezoneOffset());
  const dateString = dt.toString();
  const dateArr = dateString.split(' ');
  const [day, month, date, year] = dateArr;
  const formattedDate = `${day}, ${month} ${date}, ${year}`;
  return formattedDate;
}
