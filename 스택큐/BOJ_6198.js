const [N, ...arr] = require('fs')
  .readFileSync(__dirname + '/test.txt')
  .toString()
  .trim()
  .split('\n')
  .map(Number)

const solution = (arr, N) => {
  let answer = 0
  const stack = []
  const last = arr.pop()
  stack.push(last)
  while (arr.length) {
    const topOfArr = arr[arr.length - 1]
    let temp = 0
    while (stack.length) {
      const poppedFromStack = stack.pop()
      if (topOfArr <= poppedFromStack) {
        stack.push(poppedFromStack)
        break
      } else {
        arr.push(poppedFromStack)
        temp += 1
      }
    }
    for (let i = 0; i < temp + 1; i++) {
      stack.push(arr.pop())
    }
    answer += temp
  }
  return answer
}

console.log(solution(arr, N))
