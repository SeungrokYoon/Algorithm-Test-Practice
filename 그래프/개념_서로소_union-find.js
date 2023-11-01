const nodes = 6
const testEdges = [
  [1, 4],
  [2, 3],
  [2, 4],
  [5, 6],
]

const findParent = (parent, x) => {
  if (parent[x] != x) {
    parent[x] = findParent(parent, parent[x])
  }
  return parent[x]
}

const unionParent = (parent, a, b) => {
  a = findParent(parent, a)
  b = findParent(parent, b)
  if (a < b) {
    parent[b] = a
  } else {
    parent[a] = b
  }
}

const parent = Array.from({ length: nodes + 1 }, (_, i) => i)

for (const [node1, node2] of testEdges) {
  unionParent(parent, node1, node2)
}

//각 원소가 속한 집합 출력 = 루트 노드를 찾으면 된다
for (let i = 1; i < nodes + 1; i++) {
  console.log(findParent(parent, i))
}

console.log(parent)

/** 무방향 그래프에서의 사이클 판별 */

let cycle = false
for (const [node1, node2] of testEdges) {
  if (findParent(parent, node1) === findParent(parent, node2)) {
    cycle = true
    break
  }
  unionParent(parent, node1, node2)
}
