export function remaining(points) {
  var sum = 301
  for (var p in points) {
    sum -= points[p]
  }
  return sum
}
