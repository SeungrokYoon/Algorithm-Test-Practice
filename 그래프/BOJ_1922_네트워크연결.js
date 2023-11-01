//크루스칼 알고리즘 연습문제
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const findParent = (parent, x) => {
  if (parent[x] !== x) {
    parent[x] = findParent(parent, parent[x])
  }
  return parent[x]
}

const union = (parent, a, b) => {
  const aRoot = findParent(parent, a)
  const bRoot = findParent(parent, b)
  aRoot < bRoot ? (parent[bRoot] = aRoot) : (parent[aRoot] = bRoot)
}

const hasCycle = (parent, a, b) => {
  return findParent(parent, a) === findParent(parent, b)
}

let N = +input.shift()
let M = +input.shift()
let cost = 0

const sorted = input.map((s) => s.split(' ').map(Number)).sort((a, b) => a[2] - b[2])
const parent = Array.from({ length: N + 1 }, (_, i) => i)

sorted.forEach(([a, b, dist]) => {
  if (!hasCycle(parent, a, b)) {
    union(parent, a, b)
    cost += dist
  }
})

console.log(cost)
