export function defaultTime(time) {
  const timeArr = time.split(':');
  return `${timeArr[0]}:${timeArr[1]}`;
}
