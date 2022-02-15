const input = require('fs')
  .readFileSync(__dirname + '/test.txt')
  .toString()
  .trim()
  .split('\n')

const [N, M] = input.shift().split(' ').map(Number)
const graph = input.map((str) => str.split(' ').map(Number))

const solution = () => {
  let answer = 0
  const dRow = [1, -1, 0, 0, 1, -1, 1, -1]
  const dCol = [0, 0, 1, -1, 1, -1, -1, 1]
  const visited = Array.from({ length: N }, () => Array.from({ length: M }, () => 0))
  //각 좌표에서 봉우리가 생길 수 있는지를 검사
  for (let row = 0; row < N; row++) {
    for (let col = 0; col < M; col++) {
      //이미 체크된 봉우리면 넘기기
      if (visited[row][col] === 2) continue
      const queue = []
      queue.push([row, col])
      let pointer = 0
      const currHeight = graph[row][col]
      visited[row][col] = 1
      let isSummit = true
      while (pointer < queue.length && isSummit) {
        const [row, col] = queue[pointer]
        for (let i = 0; i < 8; i++) {
          const nextRow = row + dRow[i]
          const nextCol = col + dCol[i]
          if (
            0 <= nextRow &&
            nextRow < N &&
            0 <= nextCol &&
            nextCol < M &&
            visited[nextRow][nextCol] !== 1
          ) {
            if (graph[nextRow][nextCol] > currHeight) {
              isSummit = false
            } else if (graph[nextRow][nextCol] === graph[row][col]) {
              visited[nextRow][nextCol] = 1
              queue.push([nextRow, nextCol])
            }
          }
        }
        pointer++
      }
      if (isSummit) {
        answer++
        //visit 에 2(봉우리)로서 체크하기
        for (const summit of queue) {
          visited[summit[0]][summit[1]] = 2
        }
      } else {
        //다음 순회를 위해 1로 방문 처리되었던 visit 내 좌표들을 원상복구해준다.
        for (const summit of queue) {
          visited[summit[0]][summit[1]] = 0
        }
      }
    }
  }
  return answer
}
console.log(solution())
