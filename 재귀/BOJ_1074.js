const [n, r, c] = require('fs').readFileSync('/dev/stdin').toString().split(' ')

const solution = (n, r, c) => {
  let count = 0
  const findZ = (size, startX, startY) => {
    if (startX === c && startY === r) {
      return
    }
    if (size === 1) {
      return
    }
    const nextSize = size / 2
    if (startX <= c && c < startX + nextSize && startY <= r && r < startY + nextSize) {
      findZ(nextSize, startX, startY)
    } else if (
      startX + nextSize <= c &&
      c < startX + nextSize + nextSize &&
      startY <= r &&
      r < startY + nextSize
    ) {
      count += nextSize ** 2
      findZ(nextSize, startX + nextSize, startY)
    } else if (
      startX <= c &&
      c < startX + nextSize &&
      startY + nextSize <= r &&
      r < startY + nextSize + nextSize
    ) {
      count += 2 * nextSize ** 2
      findZ(nextSize, startX, startY + nextSize)
    } else if (
      startX + nextSize <= c &&
      c < startX + nextSize + nextSize &&
      startY + nextSize <= r &&
      r < startY + nextSize + nextSize
    ) {
      count += 3 * nextSize ** 2
      findZ(nextSize, startX + nextSize, startY + nextSize)
    }
  }
  findZ(2 ** n, 0, 0)
  return count
}

console.log(solution(n, r, c))
