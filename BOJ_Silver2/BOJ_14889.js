const input = require('fs')
  .readFileSync(__dirname + '/test.txt')
  .toString()
  .trim()
  .split('\n')

const N = input.shift() * 1
const M = N / 2
const graph = input.map((str) => str.split(' ').map(Number))
// const members = Array.from({ length: N }, (_, i) => i + 1)
const members = Array.from({ length: N }, () => false)
let min = 100 * N * N

const makeTeam = (index, count) => {
  const start = []
  const link = []
  let startScore = 0
  let linkScore = 0
  if (count === M) {
    //팀이 완성됨
    members.forEach((v, i) => (v ? start.push(i) : link.push(i)))
    for (let i = 0; i < M; i++) {
      for (let j = 0; j < M; j++) {
        startScore += graph[start[i]][start[j]]
        linkScore += graph[link[i]][link[j]]
      }
    }
    min = Math.min(Math.abs(startScore - linkScore), min)
    return
  }
  for (let i = index; i < N; i++) {
    if (members[i]) continue
    members[i] = true
    makeTeam(i, count + 1)
    members[i] = false
  }
}

makeTeam(0, 0)
console.log(min)
