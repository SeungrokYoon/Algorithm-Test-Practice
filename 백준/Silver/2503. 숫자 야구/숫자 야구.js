const input = require('fs')
  .readFileSync(process.platform == 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const N = +input[0]

const TARGET = 3
let answer = []
const pool = []
const visited = new Array(10).fill(0)

const dfs = (dep, target) => {
  if (dep === target) {
    answer.push(pool.join(''))
    return
  }
  for (let num = 1; num < 10; num++) {
    if (visited[num]) continue
    pool.push(num)
    visited[num] = 1
    dfs(dep + 1, target)
    pool.pop()
    visited[num] = 0
  }
}

//get all numbers
dfs(0, TARGET)

//filter based on input
const solution = (candidateStr) => {
  return (questionStr, strike, ball) => {
    const ballSet = new Set(candidateStr.split('').map(Number))
    let currStrike = 0
    let currBall = 0
    for (let i = 0; i < candidateStr.length; i++) {
      const questionNumber = +questionStr[i]
      if (!ballSet.has(questionNumber)) continue
      if (+candidateStr[i] === questionNumber) {
        //strike
        currStrike++
      } else {
        //ball
        currBall++
      }
    }
    return currStrike === strike && currBall === ball
  }
}

input.slice(1).forEach((l) => {
  let [questionStr, strike, ball] = l.split(' ')
  strike = Number(strike)
  ball = Number(ball)
  answer = answer.filter((candidateStr) => solution(candidateStr)(questionStr, strike, ball))
})

console.log(answer.length)
