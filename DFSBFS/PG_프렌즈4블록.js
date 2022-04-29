const deleteBlocks = (board, deleteSet) => {
  deleteSet.forEach((matrixStr) => {
    const [row, column] = matrixStr.split(',').map(Number)
    board[row][column] = '-'
  })
}

const pullColumn = (m, n, board) => {
  for (let column = 0; column < n; column++) {
    let temp = ''
    for (let row = 0; row < m; row++) {
      const block = board[row][column]
      if (block !== '-') temp += block
    }
    temp = temp.padStart(m, '-')
    for (let row = 0; row < m; row++) {
      board[row][column] = temp[row]
    }
  }
}

function solution(m, n, board) {
  var answer = 0
  board = board.map((row) => row.split(''))
  let isStop = false
  while (!isStop) {
    //찾고, 삭제, 당기기
    let deleteMatrixSet = new Set()
    for (let row = 0; row < m - 1; row++) {
      for (let column = 0; column < n - 1; column++) {
        //우향, 하향, 우하향과 비교
        const block = board[row][column]
        if (block === '-') continue
        if (
          board[row + 1][column] === block &&
          board[row][column + 1] === block &&
          board[row + 1][column + 1] === block
        ) {
          deleteMatrixSet.add([row, column].join(','))
          deleteMatrixSet.add([row + 1, column].join(','))
          deleteMatrixSet.add([row, column + 1].join(','))
          deleteMatrixSet.add([row + 1, column + 1].join(','))
        }
      }
    }
    if (deleteMatrixSet.size === 0) {
      isStop = true
      continue
    }
    answer += deleteMatrixSet.size
    deleteBlocks(board, deleteMatrixSet)
    pullColumn(m, n, board)
  }

  return answer
}
