const [M, N] = require('fs')
  .readFileSync(__dirname + '/test.txt')
  .toString()
  .trim()
  .split(' ')
  .map(Number)

//에라토스테네스의 체를 이용한 소수 찾기
const solution = (M, N) => {
  let answer = ''
  const arr = Array.from({ length: N + 1 }, (_, i) => 1)
  arr[1] = 0
  const m = Math.sqrt(N)
  for (let i = 2; i <= m; i++) {
    if (arr[i]) {
      for (let j = i + i; j < N + 1; j += i) {
        arr[j] = 0
      }
    }
  }

  for (let i = 2; i < N + 1; i++) {
    if (arr[i] === 1 && i >= M) answer += i + '\n'
  }
  return answer
}

console.log(solution(M, N))
