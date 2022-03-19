const input = require('fs').readFileSync('test.txt').toString().trim().split('\n')
const [N, M] = input[0].split(' ').map(Number)
const edges = input.slice(1, M + 1).map((s) => s.split(' ').map(Number))
//내가 몇 번째인지를 알 수 있다 = 내 밑으로 있는 사람들과 내 위에 있는 사람들의 합이 총 사람 수 -1(나 자신)이어야 한다는 발상
//그래프의 indegree, outdegree의 개념을 활용할 수 있는 인접 매트릭스를 사용하기로 결정함.
//인접 매트릭스? 그러면 플로이드 워셜 알고리즘으로 구해보자는 생각
const graph = Array.from({ length: N + 1 }, (_, i) =>
  Array.from({ length: N + 1 }, (_, j) => (i === j ? 0 : Infinity)),
)

edges.forEach(([from, to]) => {
  graph[from][to] = 1
})

for (let m = 1; m < N + 1; m++) {
  for (let s = 1; s < N + 1; s++) {
    for (let e = 1; e < N + 1; e++) {
      graph[s][e] = Math.min(graph[s][e], graph[s][m] + graph[m][e])
    }
  }
}

//indegree, outdegree 계산
let answer = 0
for (let i = 1; i < N + 1; i++) {
  let indegree = 0
  let outdegree = 0
  for (let j = 1; j < N + 1; j++) {
    if (i !== j && graph[i][j] !== Infinity) outdegree++
    if (i !== j && graph[j][i] !== Infinity) indegree++
  }
  if (indegree + outdegree === N - 1) answer++
}
console.log(answer)
