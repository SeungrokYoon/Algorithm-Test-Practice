//이코테 - p.259
const input = require('fs')
  .readFileSync('test/test.txt')
  .toString()
  .trim()
  .split('\n')
  .map((s) => s.split(' ').map(Number))
console.l

const [n, m] = input[0]

const graph = Array.from({ length: n + 1 }, () => Array.from({ length: n + 1 }, () => Infinity))

//자기 자신은 0
for (let i = 0; i < n + 1; i++) {
  for (let j = 0; j < n + 1; j++) {
    if (i === j) graph[i][j] = 0
  }
}

//간선정보 입력
for (let i = 1; i < m + 1; i++) {
  const [start, end] = input[i]
  graph[start][end] = 1
  graph[end][start] = 1
}

const [x, k] = input[m + 1]

for (let startignV = 1; startignV < n + 1; startignV++) {
  for (let routingV = 1; routingV < n + 1; routingV++) {
    for (let dest = 1; dest < n + 1; dest++) {
      graph[startignV][dest] = Math.min(
        graph[startignV][dest],
        graph[startignV][routingV] + graph[routingV][dest],
      )
    }
  }
}

const distance = graph[1][k] + graph[k][x]
if (distance >= Infinity) {
  console.log(-1)
} else {
  console.log(distance)
}

//test case
// 5 7
// 1 2
// 1 3
// 1 4
// 2 4
// 3 4
// 3 5
// 4 5
// 4 5
//답: 3
