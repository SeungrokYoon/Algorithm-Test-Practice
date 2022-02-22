const [N, ...arr] = require('fs')
  .readFileSync(__dirname + '/test.txt')
  .toString()
  .trim()
  .split('\n')
  .map(Number)

const solution = (arr, N) => {
  let answer = 0
  const stack = []
  for (let i = 0; i < N; i++) {
    while (stack.length && stack[stack.length - 1] <= arr[i]) {
      stack.pop()
    }
    stack.push(arr[i])
    answer += stack.length - 1
  }
  return answer
}

console.log(solution(arr, N))
