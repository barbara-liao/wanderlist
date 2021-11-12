import parseAddress from './parse-address';

export default function extractGeometryDetails(array) {
  const geometryArr = [];
  for (let i = 0; i < array.length; i++) {
    const geometryObj = array[i].geometry;
    geometryObj.name = array[i].name;
    geometryObj.address = parseAddress(array[i].address);
    geometryObj.phoneNumber = array[i].phoneNumber;
    geometryArr.push(geometryObj);
  }
  return geometryArr;
}
