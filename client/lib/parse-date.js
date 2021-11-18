export default function parseDate(rawDate) {
  const newDate = new Date(rawDate);
  const dateString = new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(newDate);
  return dateString;
}
