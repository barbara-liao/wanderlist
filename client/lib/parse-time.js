export default function parseTime(time) {
  const timeArr = time.split(':');
  const meridiem = timeArr[0] >= 12 ? 'PM' : 'AM';
  const formattedTime = `${((Number(timeArr[0]) + 11) % 12 + 1)}:${timeArr[1]} ${meridiem}`;
  return formattedTime;
}
