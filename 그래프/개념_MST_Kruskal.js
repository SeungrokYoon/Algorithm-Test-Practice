let input = `6
9
1 2 5
1 3 4
2 3 2
2 4 7
3 4 6
3 5 11
4 5 3
4 6 8
5 6 8
`

input = input.trim().split('\n')

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

/** Step1 - 간선을 오름차순으로 정렬한다 */
const sorted = input.map((s) => s.split(' ').map(Number)).sort((a, b) => a[2] - b[2])
const parent = Array.from({ length: N + 1 }, (_, i) => i)

/** Steop2 - 간선을 순서대로 순회하며, 사이클이 없는 간선을 합해준다. union-find를 활용하여
 * 같은 root노드여부를 확인해준다.
 * hasCycle함수에서 parent테이블을 자동으로 업데이트해주고 있다.
 */
sorted.forEach(([a, b, dist]) => {
  if (!hasCycle(parent, a, b)) {
    union(parent, a, b)
    cost += dist
  }
})

console.log(cost)
