function solution(board, skill) {
  let answer = 0
  const N = board.length
  const M = board[0].length
  const accBoard = Array.from({ length: N + 1 }, () => Array.from({ length: M + 1 }, () => 0))
  skill.forEach((eachSkill) => {
    let [type, r1, c1, r2, c2, degree] = eachSkill
    if (type === 1) {
      degree *= -1
    }
    accBoard[r1][c1] += degree
    accBoard[r2 + 1][c1] += -1 * degree
    accBoard[r1][c2 + 1] += -1 * degree
    accBoard[r2 + 1][c2 + 1] += degree
  })
  //가로로누적합
  for (let row = 0; row < N + 1; row++) {
    for (let col = 1; col < M + 1; col++) {
      accBoard[row][col] += accBoard[row][col - 1]
    }
  }
  //세로로누적합
  for (let col = 0; col < M + 1; col++) {
    for (let row = 1; row < N + 1; row++) {
      accBoard[row][col] += accBoard[row - 1][col]
    }
  }
  //정답도출
  for (let row = 0; row < N; row++) {
    for (let col = 0; col < M; col++) {
      board[row][col] + accBoard[row][col] > 0 ? answer++ : ''
    }
  }
  return answer
}
