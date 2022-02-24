const input = require('fs')
  .readFileSync(__dirname + '/test.txt')
  .toString()
  .trim()
  .split('\n')

const [N, M] = input.shift().split(' ').map(Number)

const solution = () => {
  const DFS = (start) => {
    visited[start] = 1
    for (const target of adjList[start]) {
      if (visited[target]) continue
      DFS(target)
    }
  }

  //인접리스트를 통한 BFS 또는 DFS
  let answer = 0
  const adjList = Array.from({ length: N + 1 }, () => [])
  const visited = Array.from({ length: N + 1 }, () => 0)
  for (let i = 0; i < input.length; i++) {
    const [u, v] = input[i].split(' ').map(Number)
    adjList[u].push(v)
    adjList[v].push(u)
  }
  //각 정점에서 탐색을 시작하며,정점이 방문이 안되었을 때만 탐색한다.
  for (let i = 1; i < N + 1; i++) {
    if (visited[i]) continue
    DFS(i)
    answer += 1
  }
  return answer
}

console.log(solution())
