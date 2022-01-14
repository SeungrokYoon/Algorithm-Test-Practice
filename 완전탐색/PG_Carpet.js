function solution(brown, yellow) {
  var answer = []
  const total = brown + yellow
  for (let x = 1; x <= total; x++) {
    if (total % x === 0 && x >= total / x) {
      const y = total / x
      if (2 * x + 2 * (y - 2) === brown) return [x, y]
    }
  }
}
