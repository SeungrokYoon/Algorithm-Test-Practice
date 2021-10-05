// 백준 1065 - 한수
// 링크: https://www.acmicpc.net/problem/1065

const readline = require('readline')
const r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const solution = () => {
  const n = input.shift()
  findAnswer(n)
  console.log(answer)
  return
}

const findAnswer = (n) => {
  const number = parseInt(n) + 1 // 미만이 아니라 이하인 조건이기 때문.
  for (let i = 1; i < number; i++) {
    const stringNum = '' + i
    if (stringNum.length < 3) {
      answer++
      continue
    }
    if (isAnswer(stringNum)) {
      answer++
    }
  }
}

const isAnswer = (stringN) => {
  const difference = parseInt(stringN[1] - stringN[0])
  for (let i = 1; i < stringN.length; i++) {
    const current = parseInt(stringN[i - 1])
    const next = parseInt(stringN[i])
    if (current + difference !== next) {
      return false
    }
  }
  return true
}

const input = []
let answer = 0
r1.on('line', (line) => {
  input.push(line)
}).on('close', () => {
  solution()
})
