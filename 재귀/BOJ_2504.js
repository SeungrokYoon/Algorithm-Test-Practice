const fs = require('fs')
const arr = fs.readFileSync('/dev/stdin').toString().trim().split('').reverse()

const solution = (arr) => {
  let answer = 0
  const recursion = (startParen) => {
    let tempSum = 0
    while (arr.length) {
      const nextParen = arr.pop()
      if (nextParen === '(' || nextParen === '[') {
        const subRecursed = recursion(nextParen)
        if (subRecursed) {
          tempSum += subRecursed
        } else {
          //subRecuresed가 0이면 이후 모든 상위 작업이 종료되어야 하기 때문에 0 리턴해주기
          return 0
        }
      } else if (startParen + nextParen === '()') {
        return 2 * Math.max(tempSum, 1)
      } else if (startParen + nextParen === '[]') {
        return 3 * Math.max(tempSum, 1)
      } else {
        //종류가 다른 괄호로 닫힐 때
        return 0
      }
    }
  }
  while (arr.length) {
    const subResult = recursion(arr.pop())
    if (subResult) {
      answer += subResult
    } else {
      answer = 0
      break
    }
  }
  return answer
}

console.log(solution(arr))
