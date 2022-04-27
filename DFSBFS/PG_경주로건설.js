const printBoard = (board) => {
  let boardStr = ''
  board.forEach((row) => (boardStr += row.join('') + '\n'))
  console.log(boardStr)
}

function solution(board) {
  //재귀 dfs와 백트랙킹
  const N = board.length
  let answer = 600 * N * N
  const dfs = ({ startX, startY }, board, cost, { prevX, prevY }, routes) => {
    //dfs탐색좌표, 보드, 탐색좌표까지의 비용, 이전 좌표, 누적좌표
    if (startX === N - 1 && startY === N - 1) {
      // if (answer > cost) console.log(routes, cost)
      answer = Math.min(answer, cost)
      return
    }
    const dx = [0, 1, 0, -1]
    const dy = [1, 0, -1, 0]
    for (let i = 0; i < 4; i++) {
      const nx = startX + dx[i]
      const ny = startY + dy[i]
      if (nx < 0 || nx >= N || ny < 0 || ny >= N) continue
      if (board[nx][ny] === 1) continue
      const isSameDirection = startX - prevX === dx[i] && startY - prevY === dy[i]
      const deltaCost = isSameDirection ? 100 : 600
      board[nx][ny] = 1
      // printBoard(board)
      dfs({ startX: nx, startY: ny }, board, cost + deltaCost, { prevX: startX, prevY: startY }, [
        ...routes,
        [nx, ny],
      ])
      board[nx][ny] = 0
    }
  }

  board[0][0] = 1

  //오른쪽으로 이동 후, dfs
  board[0][1] = 1
  dfs({ startX: 0, startY: 1 }, board, 100, { prevX: 0, prevY: 0 }, [
    [0, 0],
    [0, 1],
  ])
  board[0][1] = 0

  //아래쪽으로 이동 후,dfs
  board[1][0] = 1
  dfs({ startX: 1, startY: 0 }, board, 100, { prevX: 0, prevY: 0 }, [
    [0, 0],
    [1, 0],
  ])
  board[1][0] = 0
  return answer
}

// console.log(
//   solution([
//     [0, 0, 1],
//     [0, 0, 1],
//     [0, 0, 0],
//   ]),
// )
console.log(
  solution([
    [0, 0, 0, 1],
    [1, 0, 0, 1],
    [0, 0, 0, 1],
    [0, 0, 0, 0],
  ]),
)
