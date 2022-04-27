function solution(board) {
  const N = board.length
  var answer = 600 * N * N
  //dfs 완전탐색같은데?//백트랙킹
  //직선거리는 최단거리이고, 직선거리비용은 최단거리 *100
  //다음 nx,ny가 직각인지를 판단하고, 직각이면 거리+=500
  const direction = { 2: 'toRight', 1: 'toDown', '-2': 'toLeft', '-1': 'toUp' }
  const dx = [0, 1, 0, -1]
  const dy = [1, 0, -1, 0]
  const stack = [
    { x: 0, y: 1, cost: 100, latestDirection: 2 },
    { x: 1, y: 0, cost: 100, latestDirection: 1 },
  ]
  const dfs = (board, cost, latestDirection) => {}

  board[0][0] = 1
  board[0][1] = 1
  board[1][0] = 1
  const routes = []
  while (stack.length) {
    const { x, y, cost, latestDirection } = stack.pop()
    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i]
      const ny = y + dy[i]
      if (nx < 0 || nx >= N || ny < 0 || ny >= N || board[nx][ny] === 1) continue
      const newDirection = dx[i] + dy[i] * 2
      if (newDirection === latestDirection) {
        board[nx][ny] = 1
        if (nx === N - 1 && ny === N - 1) {
          answer = Math.min(answer, cost + 100)
          console.log('found!', routes)
          routes.pop()
        }
        stack.push({ x: nx, y: ny, cost: cost + 100, latestDirection: latestDirection })
        routes.push({ x: nx, y: ny, cost: cost + 100, latestDirection: latestDirection })
      } else {
        board[nx][ny] = 1
        if (nx === N - 1 && ny === N - 1) {
          answer = Math.min(answer, cost + 600)
          console.log('found!', routes)
          routes.pop()
        }
        stack.push({ x: nx, y: ny, cost: cost + 600, latestDirection: newDirection })
        routes.push({ x: nx, y: ny, cost: cost + 600, latestDirection: newDirection })
      }
    }
  }

  return answer
}

//test 4
console.log(
  solution([
    [0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 0],
    [0, 0, 1, 0, 0, 0],
    [1, 0, 0, 1, 0, 1],
    [0, 1, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0],
  ]),
)
