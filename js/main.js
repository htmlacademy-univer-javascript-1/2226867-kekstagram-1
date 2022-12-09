function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return max < min ? NaN : Math.floor(Math.random() * (max - min)) + min;
}
function strSizeCheck(str, max) {
  return !(str.length > max);
}
