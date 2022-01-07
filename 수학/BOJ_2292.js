//백준 2292 벌집
const fs = require('fs')
const input = parseInt(fs.readFileSync('/dev/stdin').toString().trim())

const solution = (inputValue) => {
  let currentValue = 1
  let answer = 0
  if (inputValue === 1) {
    console.log(currentValue)
    return
  }
  while (currentValue < inputValue) {
    currentValue += 6 * answer
    answer++
  }
  console.log(answer)
}

solution(input)
