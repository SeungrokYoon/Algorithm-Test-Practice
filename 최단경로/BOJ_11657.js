const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')
  .map((s) => s.split(' ').map(Number))

const [N, M] = input[0]
const edges = input.slice(1)
const distance = Array.from({ length: N + 1 }, () => Infinity)

const belmanFord = (start, distance) => {
  distance[start] = 0
  //벨만 포드에서는 정점개수-1 만큼 edge relaxation 진행 후, 마지막 한 번을 더 해줌.
  for (let v = 1; v < N + 1; v++) {
    //모든 간선을 살펴보기
    for (let i = 0; i < edges.length; i++) {
      const edge = edges[i]
      const [curr, next, dist] = edge
      if (distance[curr] !== Infinity && distance[next] > distance[curr] + dist) {
        distance[next] = distance[curr] + dist
        if (v === N) {
          //마지막 한 번의 edge relaxation때 갱신이 발생하면 음수 사이클 존재확인
          return true
        }
      }
    }
  }
  return false
}

const isCycle = belmanFord(1, distance)
if (isCycle) {
  console.log('-1')
} else {
  const answer = distance
    .slice(2)
    .reduce((prev, curr) => {
      const element = curr === Infinity ? -1 : curr
      return (prev += element + '\n')
    }, '')
    .trim()
  console.log(answer)
}
