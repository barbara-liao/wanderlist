export default function parseOperatingHours(hours) {
  const formattedHours = hours.replaceAll('"', '').replaceAll('{', '').replaceAll('}', '');
  const hoursArr = formattedHours.split(',');
  return hoursArr;
}
