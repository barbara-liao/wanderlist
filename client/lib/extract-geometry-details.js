import parseAddress from './parse-address';

export default function extractGeometryDetails(array) {
  const geometryArr = [];
  for (let i = 0; i < array.length; i++) {
    const geometry = array[i].geometry
      .replaceAll('{', '')
      .replaceAll('"', '')
      .replaceAll('}', '')
      .replaceAll(':', '')
      .replaceAll('lat', '')
      .replaceAll('lng', '');
    const parsedGeometry = geometry.split(',');
    const geometryObj = {
      lat: Number(parsedGeometry[0]),
      lng: Number(parsedGeometry[1]),
      name: array[i].name,
      address: parseAddress(array[i].address),
      phoneNumber: array[i].phoneNumber
    };
    geometryArr.push(geometryObj);
  }
  return geometryArr;
}
