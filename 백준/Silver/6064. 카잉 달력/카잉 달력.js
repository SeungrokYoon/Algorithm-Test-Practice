const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const solution = (l) => {
  const [M, N, targetX, targetY] = l.split(' ').map(Number)
  let year = 0
  let month = 0
  while (M * year + targetX !== N * month + targetY) {
    if (M * year + targetX > M * N || N * month + targetY > M * N) return -1
    M * year + targetX < N * month + targetY ? year++ : month++
  }
  return M * year + targetX
}
const answer = input.slice(1).map((l) => solution(l))

console.log(answer.join('\n'))
