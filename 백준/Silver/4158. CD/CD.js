const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

let lineIdx = 0
const answer = []
while (input[lineIdx] !== '0 0') {
  const [N, M] = input[lineIdx].split(' ').map(Number)
  const sangeun = input.slice(lineIdx + 1, lineIdx + 1 + N).map(Number)
  const sunyoung = input.slice(lineIdx + 1 + N, lineIdx + 1 + N + M).map(Number)
  lineIdx = lineIdx + 1 + N + M
  let counter = 0
  sangeun.forEach((targetNum) => {
    let left = 0
    let right = M - 1
    while (left <= right) {
      const mid = Math.floor((left + right) / 2)
      const searchedNum = sunyoung[mid]
      if (searchedNum === targetNum) {
        counter++
        break
      } else if (searchedNum > targetNum) {
        right = mid - 1
      } else {
        left = mid + 1
      }
    }
  })
  answer.push(counter)
}

console.log(answer.join('\n'))
