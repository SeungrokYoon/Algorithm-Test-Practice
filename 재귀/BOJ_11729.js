const fs = require('fs')
const n = parseInt(fs.readFileSync('/dev/stdin').toString().trim())

const solution = (n) => {
  let count = 0
  const answer = []
  const moveHanoiTower = (n, from, rest, to) => {
    if (!n) return
    moveHanoiTower(n - 1, from, to, rest)
    answer.push([from, to])
    count++
    moveHanoiTower(n - 1, rest, from, to)
  }
  moveHanoiTower(n, 1, 2, 3)
  console.log(count)
  return answer.map((step) => step.join(' ')).join('\n')
}

console.log(solution(n))
