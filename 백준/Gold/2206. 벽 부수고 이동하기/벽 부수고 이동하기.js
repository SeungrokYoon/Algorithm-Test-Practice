const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')
const [N, M] = input[0].split(' ').map(Number)
const map = input.slice(1).map((l) => l.split('').map(Number))

const visitedTable = Array.from({ length: N }, () =>
  Array.from({ length: M }, () => Array.from({ length: 2 }, () => 0)),
)

const queue = [[0, 0, 0]] //[row, col, breakWall]
const dx = [0, 1, 0, -1]
const dy = [1, 0, -1, 0]
//0번째 인덱스는 아직 벽을 부수지 않았을 경우의 거리가 기록되는 곳
//1번째 인덱스는 벽을 부수고 나서의 경우의 거리가 기록되는 곳
visitedTable[0][0][0] = 1

let answer = -1

let idx = 0
while (queue.length > idx) {
  const [row, col, breakWall] = queue[idx++]
  const currDist = visitedTable[row][col][breakWall]
  if (row === N - 1 && col === M - 1) {
    answer = visitedTable[row][col][breakWall]
    break
  }
  for (let i = 0; i < 4; i++) {
    const nRow = row + dx[i]
    const nCol = col + dy[i]
    if (nRow < 0 || nRow >= N || nCol < 0 || nCol >= M) continue
    if (visitedTable[nRow][nCol][breakWall] !== 0) continue
    //map 안에 존재하는 좌표인 경우
    if (map[nRow][nCol] === 0) {
      //다음 좌표가 벽이 아니라 갈 수 있는 길인 경우는 그냥 가~
      visitedTable[nRow][nCol][breakWall] = currDist + 1
      queue.push([nRow, nCol, breakWall])
    } else {
      //다음 좌표가 벽인 경우
      if (breakWall === 0) {
        //벽을 새로 뚫을 수 있음
        visitedTable[nRow][nCol][1] = currDist + 1
        queue.push([nRow, nCol, 1])
      }
    }
  }
}

console.log(answer)
