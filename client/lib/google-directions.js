export default function googleDirections(address) {
  const addressLink = address.replaceAll(' ', '+');
  return `https://www.google.com/maps?q=${addressLink}`;
}
