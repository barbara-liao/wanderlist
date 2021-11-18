export default function parseDate(date) {
  const newDate = new Date(date);
  const dateString = new Intl.DateTimeFormat();
  const locale = dateString.resolvedOptions().timeZone;
  const options = {
    dateStyle: 'full',
    timeZone: locale
  };
  const dateString2 = new Intl.DateTimeFormat(options).format(newDate);
  return dateString2;
}
