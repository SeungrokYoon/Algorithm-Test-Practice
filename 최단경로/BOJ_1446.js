const input = require('fs').readFileSync('test.txt').toString().trim().split('\n')
const [N, D] = input[0].split(' ').map(Number)
const edges = input.slice(1, 1 + N).map((s) => s.split(' ').map(Number))

const solution = (edges) => {
  const vSet = new Set()
  const linkedMap = new Map()
  const distanceMap = new Map()
  vSet.add(0)
  vSet.add(D)
  //generate linkedMap
  edges.forEach(([v1, v2, weight]) => {
    if (v2 > D) return
    if (v2 - v1 <= weight) return
    if (!linkedMap.get(v1)) linkedMap.set(v1, new Map())
    if (!linkedMap.get(v1).get(v2)) linkedMap.get(v1).set(v2, weight)
    const smaller = Math.min(linkedMap.get(v1).get(v2), weight)
    linkedMap.get(v1).set(v2, smaller)

    vSet.add(v1)
    vSet.add(v2)
  })
  //vertex 까지 드는 최소거리를 저장하는 맵
  const vertices = [...vSet].sort((a, b) => a - b)
  vertices.forEach((v) => {
    distanceMap.set(v, v)
  })
  distanceMap.set(0, 0)
  for (let i = 0; i < vertices.length; i++) {
    for (let j = i + 1; j < vertices.length; j++) {
      const v1 = vertices[i]
      const v2 = vertices[j]
      if (!linkedMap.get(v1)) {
        distanceMap.set(v2, Math.min(distanceMap.get(v2), distanceMap.get(v1) + v2 - v1))
        continue
      } else {
        if (linkedMap.get(v1).has(v2))
          distanceMap.set(
            v2,
            Math.min(distanceMap.get(v2), distanceMap.get(v1) + linkedMap.get(v1).get(v2)),
          )
      }
    }
  }
  return distanceMap.get(D)
}

console.log(solution(edges))
