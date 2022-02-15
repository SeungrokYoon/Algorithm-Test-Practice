const N =
  require('fs')
    .readFileSync(__dirname + '/test.txt')
    .toString()
    .trim() * 1

const solution = () => {
  if (N === 1) console.log(0)
  const arr = Array.from({ length: N + 1 }, () => N + 1)
  arr[1] = 0
  for (let i = 1; i < N + 1; i++) {
    if (i + 1 < N + 1) {
      arr[i + 1] = Math.min(arr[i + 1], arr[i] + 1)
    }
    if (i * 2 < N + 1) {
      arr[i * 2] = Math.min(arr[i * 2], arr[i] + 1)
    }
    if (i * 3 < N + 1) {
      arr[i * 3] = Math.min(arr[i * 3], arr[i] + 1)
    }
  }
  return arr[N]
}

console.log(solution())
