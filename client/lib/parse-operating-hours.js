export default function parseOperatingHours(hours) {
  if (!hours) return;
  const formattedHours = hours.replaceAll('"', '').replaceAll('{', '').replaceAll('}', '');
  const hoursArr = formattedHours.split(',');
  return hoursArr;
}
