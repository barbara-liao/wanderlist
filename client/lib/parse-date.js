export default function parseDate(rawDate) {
  const dateString = new Date(rawDate).toString();
  const dateArr = dateString.split(' ');
  const [day, month, date, year] = dateArr;
  const formattedDate = `${day}, ${month} ${date}, ${year}`;
  return formattedDate;
}
