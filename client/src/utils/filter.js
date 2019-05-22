export function remaining(points) {
  var sum = 301
  for (var p in points) {
    sum -= points[p]
  }
  return sum
}

export function average(points) {
  if (points.length == 0) return 0
  var sum = 0
  for (var p in points) {
    sum += points[p]
  }
  return sum / points.length
}
