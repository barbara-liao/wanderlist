export default function extractGeometry(array) {
  const geometryArr = [];
  for (let i = 0; i < array.length; i++) {
    geometryArr.push(array[i].geometry);
  }
  return geometryArr;
}
