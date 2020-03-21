//proudly stole from mineflayer so we dont need to do a whole bunch of boring math

exports.clamp = function clamp(min, x, max) {
  return x < min ? min : x > max ? max : x
}

exports.sign = function sign(n) {
  return n > 0 ? 1 : n < 0 ? -1 : 0
}

exports.euclideanMod = function euclideanMod(numerator, denominator) {
  const result = numerator % denominator
  return result < 0 ? result + denominator : result
}

exports.dist = (loc1, loc2) => Math.sqrt((loc1.x - loc2.x) ** 2 + (loc1.y - loc2.y) ** 2 + (loc1.z - loc2.z) ** 2);
