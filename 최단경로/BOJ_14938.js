const input = require('fs').readFileSync('test.txt').toString().trim().split('\n')
const [n, m, r] = input[0].split(' ').map(Number)
const itemsPerVertex = [0].concat(input[1].split(' ').map(Number))
const edges = input.slice(2, m + 2).map((s) => s.split(' ').map(Number))

const floydWarshall = (n, edges) => {
  //create graph
  const adjMatrix = new Map()

  for (let i = 1; i < n + 1; i++) {
    adjMatrix.set(i, new Map())
    for (let j = 1; j < n + 1; j++) {
      adjMatrix.get(i).set(j, Infinity)
    }
  }

  for (const [v1, v2, weight] of edges) {
    const newValue = Math.min(adjMatrix.get(v1).get(v2), weight)
    adjMatrix.get(v1).set(v2, newValue)
    adjMatrix.get(v2).set(v1, newValue)
  }

  for (let i = 1; i < n + 1; i++) {
    adjMatrix.get(i).set(i, 0)
  }

  //O(V^3) traverse
  for (let m = 1; m < n + 1; m++) {
    for (let s = 1; s < n + 1; s++) {
      for (let e = 1; e < n + 1; e++) {
        if (adjMatrix.get(s).get(e) > adjMatrix.get(s).get(m) + adjMatrix.get(m).get(e)) {
          adjMatrix.get(s).set(e, adjMatrix.get(s).get(m) + adjMatrix.get(m).get(e))
        }
      }
    }
  }
  return adjMatrix
}

const solution = () => {
  const adjMatrix = floydWarshall(n, edges)
  let answer = 0
  for (let i = 1; i < n + 1; i++) {
    let tempSum = 0
    for (const [j, dist] of adjMatrix.get(i).entries()) {
      tempSum += dist <= r ? itemsPerVertex[j] : 0
    }
    answer = Math.max(answer, tempSum)
  }
  return answer
}

console.log(solution())
