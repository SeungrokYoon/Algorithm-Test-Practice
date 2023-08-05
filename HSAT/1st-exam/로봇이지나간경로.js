/**
 * 이 문제를 풀면서 몇 가지 헷갈렸던 점들이 있었습니다.
 *
 * 첫 번째, 문제의 설명이 '90도 회전'이라는 것이 단일동작이라고 착각하게 만듭니다.
 * 90도 회전 이후, 좌표를 이동하는 것까지(A, LA, LLA, ,RA)를 하나의 동작으로 인지하고 문제를 풀이해야 합니다.
 * 로봇이 동작을 시작하는 지점은 구하려면 구할 수 있으나, 그냥 #이 위치한 좌표에서 탐색을 시작하는게 좋을 것 같습니다.
 * 출발좌표를 설정하고나면, 4가지 방향으로 가면서 탐색! LA LLA A RA 이렇게 네 가지 케이스가 있을 것입니다.
 *
 * 두 번째, "명령어의 개수를 최소화하면서 목표를 달성할 수 있는 방법이 여러가지" 이 부분입니다.
 * 이건 위의 LA LLA A RA로 이미 최적화가 된 부분입니다. 걱정하지 말기! 우리가 내는 답이 무조건 옳게 되어 있습니다.
 *
 * 세 번째, 방문 표시를 어떻게 할 것이냐 입니다. 백트랙킹이기에 recursion 전에 방문표시를 했다가, recursion이 끝나면 방문 표시를 해제해주려합니다.
 */

const input = require('fs').readFileSync(0).toString().trim().split('\n')
const [H, W] = input[0].split(' ').map(Number)

let totalCount = 0
const originalMap = Array.from({ length: H + 1 }, () => Array.from({ length: W + 1 }, () => 0))
for (let i = 1; i <= H; i++) {
  for (let j = 1; j <= W; j++) {
    originalMap[i][j] = input[i].split('')[j - 1]
    if (input[i].split('')[j - 1] === '#') totalCount++
  }
}

const visited = Array.from({ length: H + 1 }, () => Array.from({ length: W + 1 }, () => 0))

const dRow = [-1, 0, 1, 0]
const dCol = [0, 1, 0, -1]
const dirToChar = { 0: '^', 1: '>', 2: 'v', 3: '<' }

const getNextCmd = (direction) => {
  //direction===0 하던거 해라
  //direction===1 오른쪽으로 돌려라
  switch (direction) {
    case 0:
      return 'A'
    case 1:
      return 'RA'
    case 2:
      return 'RRA'
    case 3:
      return 'LA'
  }
}

const answerArr = []

const recursion = ({ currRow, currCol, currDir, count, memoizedCmd, ...startInfo }) => {
  if (count === totalCount) {
    const answerObj = { row: 0, col: 0, dir: 0, cmd: '' }
    answerObj.row = startInfo.startRow
    answerObj.col = startInfo.startCol
    answerObj.dir = dirToChar[startInfo.startDir]
    answerObj.cmd = memoizedCmd
    answerArr.push(answerObj)
    return
  }
  for (let i = 0; i < 4; i++) {
    const nextDir = (currDir + i) % 4
    const nRow = currRow + dRow[nextDir]
    const nCol = currCol + dCol[nextDir]
    const nRow2 = currRow + dRow[nextDir] * 2
    const nCol2 = currCol + dCol[nextDir] * 2
    if (nRow2 < 1 || nCol2 < 1 || nRow2 > H || nCol2 > W) continue
    if (
      originalMap[nRow][nCol] !== '#' ||
      originalMap[nRow2][nCol2] !== '#' ||
      visited[nRow][nCol] ||
      visited[nRow2][nCol2]
    )
      continue
    //로봇을 돌리고 전진시키기 위한 최적의 커맨드 찾기
    const nextCmd = getNextCmd(i)
    //전진하는거니까 등록
    visited[nRow][nCol] = 1
    visited[nRow2][nCol2] = 1
    recursion({
      currRow: nRow2,
      currCol: nCol2,
      currDir: nextDir,
      count: count + 2,
      memoizedCmd: memoizedCmd + nextCmd,
      ...startInfo,
    })
    visited[nRow][nCol] = 0
    visited[nRow2][nCol2] = 0
  }
}

const solution = () => {
  for (let i = 1; i <= H; i++) {
    for (let j = 1; j <= W; j++) {
      if (originalMap[i][j] !== '#') continue
      //인접한 '#'이 하나만 있는 좌표가 시작점 또는 끝점
      let adjCounter = 0
      for (let d = 0; d < 4; d++) {
        const adjRow = i + dRow[d]
        const adjCol = j + dCol[d]
        if (adjRow < 1 || adjCol < 1 || adjRow > H || adjCol > W) continue
        if (originalMap[adjRow][adjCol] === '#') adjCounter += 1
      }
      if (adjCounter !== 1) continue
      for (let direction = 0; direction < 4; direction++) {
        //visited초기화
        for (let i = 0; i < H; i++) {
          for (let j = 0; j < W; j++) {
            visited[i][j] = 0
          }
        }
        //처음 로봇이 바라보는 방향만 설정해주면서 재귀. 따라서 한 좌표에 대해서 4방향으로 검증을 하게 된다.
        visited[i][j] = 1
        recursion({
          currRow: i,
          currCol: j,
          currDir: direction,
          count: 1,
          memoizedCmd: '',
          startRow: i,
          startCol: j,
          startDir: direction,
        })
        visited[i][j] = 0
      }
    }
  }
}

solution()
const sortByCmd = (a, b) => b.cmd.localeCompare(a.cmd)
answerArr.sort(sortByCmd)
const ans = answerArr.pop()
console.log(`${ans.row} ${ans.col}`)
console.log(ans.dir)
console.log(ans.cmd)
