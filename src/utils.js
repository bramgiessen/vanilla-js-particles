export const debounce = (func, wait, immediate) => {
  let timeout;
  return function () {
    const context = this,
      args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

/**
 * Rotate a given list of polygon coordinates around a given point (x,y)
 * @param coordsArray - List of coordinates that represent a polygon
 * @param point - Coordinate around which we want the polygon to rotate
 * @param rotation - Rotation in degrees
 * @return {Uint8Array | BigInt64Array | {x: *, y: *}[] | Float64Array | Int8Array | Float32Array | Int32Array | Uint32Array | Uint8ClampedArray | BigUint64Array | Int16Array | Uint16Array}
 */
export const rotatePolygonAroundPoint = (coordsArray, point, rotation) => {
  const s = Math.sin(rotation);
  const c = Math.cos(rotation);
  return coordsArray.map((coordinate) => {
    const relativeX = coordinate.x - point.x;
    const relativeY = coordinate.y - point.y;
    const rotatedX = relativeX * c - relativeY * s;
    const rotatedY = relativeX * s + relativeY * c;
    return { x: point.x + rotatedX, y: point.y + rotatedY }
  })
};

/**
 * Return a value that sines between a min and a max value, based on given arbitrary time value
 * @param min
 * @param max
 * @param t
 * @return {*}
 */
export const sineBetween = (min, max, t) => {
  const halfRange = (max - min) / 2;
  return min + halfRange + Math.sin(t) * halfRange;
};

/**
 * Calculate distance between 2 coordinates
 * @param point1
 * @param point2
 * @return {number}
 */
export const calculateDistance = (point1, point2) => {
  let x = Math.abs(point1.x - point2.x);
  let y = Math.abs(point1.y - point2.y);
  return Math.sqrt((x * x) + (y * y));
};

/**
 * Returns a random value in between a range, with a bias towards a given value with an influence between 0 and 1
 * @param min
 * @param max
 * @param bias
 * @param influence
 * @return {number}
 */
export const getBiasedRandom = (min, max, bias, influence) => {
  const rnd = Math.random() * (max - min) + min;   // random in range
  const mix = Math.random() * influence;           // random mixer
  return rnd * (1 - mix) + bias * mix;           // mix full range and bias
};