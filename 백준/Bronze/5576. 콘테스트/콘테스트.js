const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')
  .map(Number)

const W_UNIV_SCORE = input
  .slice(0, 10)
  .sort((a, b) => b - a)
  .slice(0, 3)
  .reduce((acc, curr) => acc + curr, 0)
const K_UNIV_SCORE = input
  .slice(10)
  .sort((a, b) => b - a)
  .slice(0, 3)
  .reduce((acc, curr) => acc + curr, 0)

console.log(`${W_UNIV_SCORE} ${K_UNIV_SCORE}`)
