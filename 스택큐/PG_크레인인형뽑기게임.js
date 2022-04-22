function solution(board, moves) {
  var answer = 0
  const stack = []
  moves.forEach((move) => {
    for (let row = 0; row < board.length; row++) {
      if (board[row][move - 1] !== 0) {
        const picked = board[row][move - 1]
        board[row][move - 1] = 0
        if (stack.length && stack[stack.length - 1] === picked) {
          stack.pop()
          answer += 2
          return
        }
        stack.push(picked)
        return
      }
    }
  })

  return answer
}
