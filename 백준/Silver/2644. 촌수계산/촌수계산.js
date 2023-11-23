const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const N = +input[0]
const [aPerson, bPerson] = input[1].split(' ').map(Number)
const m = +input[2]
const visited = Array.from({ length: N + 1 }, () => false)

const adjMap = input.slice(3).reduce((acc, currLine) => {
  const [v1, v2] = currLine.split(' ').map(Number)
  acc.has(v1) ? acc.set(v1, [...acc.get(v1), v2]) : acc.set(v1, [v2])
  acc.has(v2) ? acc.set(v2, [...acc.get(v2), v1]) : acc.set(v2, [v1])
  return acc
}, new Map())

let answer = 0
const findPerson = () => {
  const queue = [[aPerson, 0]]
  visited[aPerson] = true

  while (queue.length) {
    const [currNode, dist] = queue.pop()
    visited[currNode] = true
    if (currNode === bPerson) {
      answer = dist
      break
    }
    for (const childNode of adjMap.get(currNode)) {
      if (visited[childNode]) continue
      queue.push([childNode, dist + 1])
    }
  }
}

findPerson()

console.log(answer === 0 ? -1 : answer)
