// S4: 다리놓기 https://www.acmicpc.net/problem/1010

/**
 * 다리가 서로 겹치지 않는 다는 것은, 다리에 순서가 이미 존재한다는 의미와 동일함으로 이해
 * 따라서 조합 문제로 판단
 * 그리고 조합의 배열을 구하는 것이 아닌, 조합의 개수를 구하는 문제이므로 파스칼의 삼각형을 이용했음.
 */
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')
const nLines = input.shift()

const binomialCoefficient = (n, m) => {
  if (n === 1 || m === 0 || m === n) return 1
  if (m < 0) return 0
  return binomialCoefficient(n - 1, m) + binomialCoefficient(n - 1, m - 1)
}

const combination = (n, m) => {
  return binomialCoefficient(n, m)
}

const answer = input.reduce((prev, line) => {
  const [r, n] = line.split(' ').map(Number)
  return (prev += combination(n, r) + '\n')
}, '')

console.log(answer)
