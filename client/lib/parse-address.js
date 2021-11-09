export default function parseAddress(address) {
  const parsedAddress = address
    .replaceAll('< span class="street-address" >', '')
    .replaceAll('<span class="street-address">', '')
    .replaceAll('<span class="locality">', '')
    .replaceAll('<span class="region">', '')
    .replaceAll('<span class="postal-code">', '')
    .replaceAll('<span class="country-name">', '')
    .replaceAll('</span>', '');
  return parsedAddress;
}
