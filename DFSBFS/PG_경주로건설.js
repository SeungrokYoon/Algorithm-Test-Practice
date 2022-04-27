function solution(board) {
  //재귀 dfs와 백트랙킹, dp
  const N = board.length
  let answer = 600 * N * N
  const dfs = ({ startX, startY }, board, cost, { prevX, prevY }, dp) => {
    //dfs탐색좌표, 보드, 탐색좌표까지의 비용, 이전 좌표, 누적좌표
    if (startX === N - 1 && startY === N - 1) {
      answer = Math.min(answer, cost)
      return
    }
    const dx = [0, 1, 0, -1]
    const dy = [1, 0, -1, 0]
    for (let i = 0; i < 4; i++) {
      const nx = startX + dx[i]
      const ny = startY + dy[i]
      if (nx < 0 || nx >= N || ny < 0 || ny >= N || board[nx][ny] === 1) continue
      const isSameDirection = startX - prevX === dx[i] && startY - prevY === dy[i]
      const nextCost = isSameDirection ? cost + 100 : cost + 600
      const currentCost = dp[nx][ny]
      if (nextCost >= currentCost) continue
      dp[nx][ny] = nextCost
      board[nx][ny] = 1
      dfs({ startX: nx, startY: ny }, board, nextCost, { prevX: startX, prevY: startY }, dp)
      board[nx][ny] = 0
    }
  }

  board[0][0] = 1
  //오른쪽으로 이동 후, dfs
  if (board[0][1] === 0) {
    const dp = Array.from({ length: N }, () => Array.from({ length: N }, () => Infinity))
    board[0][1] = 1
    dp[0][1] = 100
    dfs({ startX: 0, startY: 1 }, board, 100, { prevX: 0, prevY: 0 }, dp)
    board[0][1] = 0
  }
  //아래쪽으로 이동 후,dfs
  if (board[1][0] === 0) {
    const dp = Array.from({ length: N }, () => Array.from({ length: N }, () => Infinity))
    board[1][0] = 1
    dp[1][0] = Infinity
    dfs({ startX: 1, startY: 0 }, board, 100, { prevX: 0, prevY: 0 }, dp)
    board[1][0] = 0
  }
  return answer
}
