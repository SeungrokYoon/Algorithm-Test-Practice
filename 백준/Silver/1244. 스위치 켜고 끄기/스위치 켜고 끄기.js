const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const SWITCHES = +input[0]
const switchState = input[1].split(' ').map(Number)
switchState.unshift(0)
const STUDENTS = +input[2]
const studentsArr = input.slice(3).map((l) => l.split(' ').map(Number))

const solution = (gender, studentNum) => {
  if (gender === 1) {
    for (let i = studentNum; i < SWITCHES + 1; i += studentNum) {
      switchState[i] = (switchState[i] + 1) % 2
    }
  } else {
    switchState[studentNum] = (switchState[studentNum] + 1) % 2
    let left = studentNum - 1
    let right = studentNum + 1
    while (left >= 1 && right <= SWITCHES && switchState[left] === switchState[right]) {
      switchState[left] = (switchState[left] + 1) % 2
      switchState[right] = (switchState[right] + 1) % 2
      left--
      right++
    }
  }
}

studentsArr.forEach(([gender, studentNum]) => {
  solution(gender, studentNum)
})

let answer = ''
for (let i = 1; i < SWITCHES + 1; i += 20) {
  answer += switchState.slice(i, i + 20).join(' ') + '\n'
}
console.log(answer.trim())
