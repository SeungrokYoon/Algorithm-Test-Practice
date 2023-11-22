const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const N = +input[0]
const edges = input.slice(1).map((s) => s.split(' ').map(Number))
const treeMap = new Map()

edges.forEach(([v1, v2]) => {
  treeMap.has(v1) ? treeMap.set(v1, [...treeMap.get(v1), v2]) : treeMap.set(v1, [v2])
  treeMap.has(v2) ? treeMap.set(v2, [...treeMap.get(v2), v1]) : treeMap.set(v2, [v1])
})

const queue = [1]
const visited = Array.from({ length: N + 1 }, () => false)
const parent = Array.from({ length: N + 1 }, () => 0)
parent[1] = 1

while (queue.length) {
  const curr = queue.shift()
  visited[curr] = true
  for (const connectedNode of treeMap.get(curr)) {
    if (visited[connectedNode]) continue
    visited[connectedNode] = true
    parent[connectedNode] = curr
    queue.push(connectedNode)
  }
}

console.log(parent.slice(2).join('\n'))
