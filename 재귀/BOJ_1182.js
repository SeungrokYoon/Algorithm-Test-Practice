const fs = require('fs')
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n')
const [N, S] = input[0].split(' ').map((n) => 1 * n)
const arr = input[1].split(' ').map((n) => 1 * n)

const solution = (N, S, arr) => {
  let answer = 0
  const findSubArr = (N, S, arr, subSum, nextIndex) => {
    if (nextIndex === N) return
    if (subSum + arr[nextIndex] === S) answer += 1
    findSubArr(N, S, arr, subSum, nextIndex + 1)
    findSubArr(N, S, arr, subSum + arr[nextIndex], nextIndex + 1)
  }
  findSubArr(N, S, arr, 0, 0)

  return answer
}
console.log(solution(N, S, arr))
