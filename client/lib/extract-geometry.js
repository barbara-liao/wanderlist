export default function extractGeometry(array) {
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
    const geometryObj = { lat: Number(parsedGeometry[0]), lng: Number(parsedGeometry[1]) };
    geometryArr.push(geometryObj);
  }
  return geometryArr;
}
