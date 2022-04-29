const findSquare = (m, n, board, tobeDeleted) => {
  const visited = Array.from({ length: m }, () => Array.from({ length: n }, () => 0))
  const dRow = [0, 1]
  const dCol = [1, 0]
  for (let row = 0; row < m; row++) {
    for (let column = 0; column < n; column++) {
      if (visited[row][column] === 1 || board[row][column] === '-') continue
      //bfs스타트
      const queue = []
      queue.push({ row, column })
      visited[row][column] = 1
      while (queue.length) {
        const dequeued = queue.shift()
        const { row, column } = dequeued
        const block = board[row][column]
        for (let i = 0; i < 2; i++) {
          const newRow = row + dRow[i]
          const newColumn = column + dCol[i]
          if (
            newRow < 0 ||
            newColumn < 0 ||
            newRow >= m ||
            newColumn >= n ||
            visited[newRow][newColumn] === 1 ||
            board[newRow][newColumn] !== block
          )
            continue
          //좌측상단, 상단, 좌측이 존재하고, 모두 block인지 판단
          let counter = 1
          const upRow = newRow - 1
          const leftColumn = newColumn - 1
          const backRow = [0, -1, -1]
          const backColumn = [-1, 0, -1]
          for (let i = 0; i < 3; i++) {
            const prevRow = newRow + backRow[i]
            const prevColumn = newColumn + backColumn[i]
            if (prevRow < 0 || prevColumn < 0 || prevRow >= m || prevColumn >= n) continue
            if (
              board[prevRow][prevColumn] === block ||
              board[prevRow][prevColumn] === block.toLowerCase()
            ) {
              //좌표를 만족하고 block이면
              counter++
            }
          }
          if (counter === 4) {
            board[newRow][newColumn] = block.toLowerCase()
            board[upRow][newColumn] = block.toLowerCase()
            board[newRow][leftColumn] = block.toLowerCase()
            board[upRow][leftColumn] = block.toLowerCase()
          }
          queue.push({ row: newRow, column: newColumn })
          visited[newRow][newColumn] = 1
        }
      }
    }
  } //for
}

const countDeleteSquare = (m, n, board) => {
  //삭제될 좌표들을 보드에서 삭제하기
  let counter = 0
  for (let row = 0; row < m; row++) {
    for (let column = 0; column < n; column++) {
      const block = board[row][column]
      if (block !== '-' && block === block.toLowerCase()) {
        counter++
      }
    }
  }
  return counter
}

const pullColumn = (m, n, board) => {
  //삭제된 보드를 아래로 당기기
  for (let column = 0; column < n; column++) {
    const queue = []
    for (let row = 0; row < m; row++) {
      const block = board[row][column]
      board[row][column] = '-'
      if (block === block.toLowerCase()) continue
      queue.push(block)
    }
    for (let r = m - 1; r >= 0; r--) {
      if (queue.length) {
        board[r][column] = queue.shift()
      }
    }
  }
}

function solution(m, n, board) {
  var answer = 0
  board = board.map((row) => row.split(''))
  let isStop = false
  let tobeDeleted = 0
  while (!isStop) {
    //찾고, 삭제, 당기기
    findSquare(m, n, board, tobeDeleted)
    tobeDeleted = countDeleteSquare(m, n, board)
    if (tobeDeleted === 0) isStop = true
    answer += tobeDeleted
    pullColumn(m, n, board)
    tobeDeleted = 0
  }

  return answer
}
