const input = require('fs')
  .readFileSync(__dirname + '/test.txt')
  .toString()
  .trim()
  .split('\n')

const N = input.shift() * 1
const M = N / 2
const graph = input.map((str) => str.split(' ').map(Number))
const members = Array.from({ length: N }, (_, i) => i + 1)

function combination(arr, selectNum) {
  const result = []
  if (selectNum === 1) return arr.map((v) => [v])
  arr.forEach((v, idx, arr) => {
    const fixed = v
    const restArr = arr.slice(idx + 1)
    const combinationArr = combination(restArr, selectNum - 1)
    const combineFix = combinationArr.map((v) => [fixed, ...v])
    result.push(...combineFix)
  })
  return result
}

const answer = []
const combis = combination(members, M)
for (const startTeam of combis) {
  const linkTeam = []
  //링크팀 만들기
  for (const member of members) {
    if (!startTeam.includes(member)) {
      linkTeam.push(member)
    }
  }
  //startCombi 만들기
  const startCombi = combination(startTeam, 2)
  let startSum = 0
  for (const combi of startCombi) {
    const [i, j] = combi
    startSum += graph[i - 1][j - 1] + graph[j - 1][i - 1]
  }

  //linkCombi 만들기
  const linkCombi = combination(linkTeam, 2)
  let linkSum = 0
  for (const combi of linkCombi) {
    const [i, j] = combi
    linkSum += graph[i - 1][j - 1] + graph[j - 1][i - 1]
  }
  answer.push(Math.abs(startSum - linkSum))
}
console.log(Math.min(...answer))
