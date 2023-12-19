const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')
const numberOfTests = input[0]

const formatter = (test, result) => {
  return `Case #${test}: ${result}`
}

const INIT_HEIGHT = 0
const solution = (test, n, houses) => {
  //dp에는 무엇이 저장되어야 하는가, i 번째 인덱스에 위치한 값이 의미하는 바는 무엇인가 =>어떠한 최적값
  //자기 기준으로 왼쪽으로 순회하면서 조건에 맞지 않는 같거나 큰 녀석들의 개수,
  //반대로, 이전 수행까지 빼야하는 건물의 최소값에 자기자신(1)을 더한 값,
  //위 두 값의 최소값이 i번째 집까지 고려하면서 부숴야하는 집 개수의 최소값이 아닐까?
  const dp = Array.from({ length: n }, () => 0)
  for (let i = 1; i < n; i++) {
    let counter = 0
    for (let j = 0; j < i; j++) {
      if (houses[j] >= houses[j + 1]) counter++
    }
    dp[i] = counter
  }
  const result = dp[n - 1]
  return formatter(test, result)
}

const answer = []
let i = 1
for (let test = 1; test <= numberOfTests; test++) {
  const n = +input[i]
  const houses = input[i + 1].split(' ').map(Number)
  answer.push(solution(test, n, houses))
  i += 2
}

console.log(answer.join('\n'))
