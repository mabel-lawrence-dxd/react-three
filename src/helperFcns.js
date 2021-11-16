function normalize(vector) {
  const x = vector[0];
  const y = vector[1];
  const z = vector[2];
  const denom = magnitude(vector);
  const normX = x / denom;
  const normY = y / denom;
  const normZ = z / denom;
  return [normX, normY, normZ];
}

function clamp(vector, max) {
  const x = vector[0];
  const y = vector[1];
  const z = vector[2];
  const mag = magnitude(vector);
  const f = mag === 0 ? 0 : Math.min(mag, max) / mag;
  return [f * x, f * y, f * z];
}

function magnitude(vector) {
  const x = vector[0];
  const y = vector[1];
  const z = vector[2];
  return Math.sqrt(x ** 2 + y ** 2 + z ** 2);
}

function subtract(a, b) {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

function add(a, b) {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}

function multScalar(a, b) {
  return [a[0] * b, a[1] * b, a[2] * b];
}

function divScalar(a, b) {
  return [a[0] / b, a[1] / b, a[2] / b];
}

function scale(number, inMin, inMax, outMin, outMax) {
  return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

function distance(pt1, pt2){
  let dist = Math.sqrt((pt2.x-pt1.x)**2+(pt2.y-pt1.y)**2);
  return dist;
}

export { normalize, clamp, magnitude, subtract, add, multScalar, divScalar, scale, distance };
