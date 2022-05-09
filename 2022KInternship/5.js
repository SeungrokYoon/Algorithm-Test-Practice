class Matrix {
  constructor(board) {
    this.board = board
  }

  shiftRow() {
    const popped = this.board.pop()
    this.board = [popped].concat(this.board)
  }
  unshiftRow() {
    const shifted = this.board.shift()
    this.board.push(shifted)
  }
  rotate() {
    const rowSize = this.board.length
    const colSize = this.board[0].length
    const lastNum = this.board[0][0]
    //1row부터 length번 row 0번 컬럼부터 위로 땡기기
    for (let row = 1; row < rowSize; row++) {
      this.board[row - 1][0] = this.board[row][0]
    }
    //마지막row의 1번컬럼부터 마지막까지 좌로 땡기기
    for (let col = 1; col < colSize; col++) {
      this.board[rowSize - 1][col - 1] = this.board[rowSize - 1][col]
    }
    //마지막에서 두 번째 row부터 0row까지 아래로 땡기기
    for (let row = rowSize - 2; row >= 0; row--) {
      this.board[row + 1][colSize - 1] = this.board[row][colSize - 1]
    }
    //첫 row 오른쪽으로 당기기
    for (let col = colSize - 2; col >= 1; col--) {
      this.board[0][col + 1] = this.board[0][col]
    }
    this.board[0][1] = lastNum
  }
  reverseRotate() {
    const rowSize = this.board.length
    const colSize = this.board[0].length
    const lastNum = this.board[0][0]
    for (let col = 1; col < colSize; col++) {
      this.board[0][col - 1] = this.board[0][col]
    }
    for (let row = rowSize - 1; row >= 0; row--) {
      this.board[row - 1][colSize - 1] = this.board[row][colSize - 1]
    }
    for (let col = colSize - 2; col >= 0; col--) {
      this.board[rowSize - 1][col + 1] = this.board[rowSize - 1][col]
    }
    for (let row = 1; row < rowSize; row++) {
      this.board[row + 1][0] = this.board[row][0]
    }
    this.board[1][0] = lastNum
  }
  jumpRotate(n) {
    const rowSize = this.board.length
    const colSize = this.board[0].length
    const nums = []
    for (let col = 0; col < colSize; col++) {
      nums.push(this.board[0][col])
    }
    for (let row = 1; row < rowSize; row++) {
      nums.push(this.board[row][colSize - 1])
    }
    for (let col = colSize - 2; col >= 0; col--) {
      nums.push(this.board[rowSize - 1][col])
    }
    for (let row = rowSize - 2; row >= 1; row--) {
      nums.push(this.board[row][0])
    }
    const jumped = [...nums.slice(-n), ...nums.slice(0, nums.length - n)]
    //다시 넣어주기
    let pointer = 0
    for (let col = 0; col < colSize; col++) {
      this.board[0][col] = jumped[pointer++]
    }
    for (let row = 1; row < rowSize; row++) {
      this.board[row][colSize - 1] = jumped[pointer++]
    }
    for (let col = colSize - 2; col >= 0; col--) {
      this.board[rowSize - 1][col] = jumped[pointer++]
    }
    for (let row = rowSize - 2; row >= 1; row--) {
      this.board[row][0] = jumped[pointer++]
    }
  }

  print() {
    return this.board
  }
}

function solution(rc, operations) {
  var answer = [[]]
  const matrix = new Matrix(rc)
  const rowSize = rc.length
  const colSize = rc[0].length
  let rotates = 0
  let shifts = 0
  let status = ''
  const edgeLength = 2 * (rc.length + rc[0].length) - 4
  operations.forEach((operation, i) => {
    if (i === 0) {
      status = operation
      status === 'Rotate' ? rotates++ : shifts++
      return
    }
    if (operation === status) {
      if (operation === 'Rotate') {
        rotates = (rotates + 1) % edgeLength
      } else {
        shifts = (shifts + 1) % rowSize
      }
    } else {
      //새로운 스태터스라면
      //누적된 이전 스태터스 작업을 해주면됨
      if (operation === 'Rotate') {
        //누적된 shift작업
        if (shifts <= rowSize / 2) {
          for (let i = 0; i < shifts; i++) {
            matrix.shiftRow()
          }
        } else {
          for (let i = 0; i < rowSize - shifts; i++) {
            matrix.shiftRow()
          }
        }
        shifts = 0
        rotates = 1
        status = 'Rotate'
      } else {
        //누적된 rotate작업
        matrix.jumpRotate(rotates)
        shifts = 1
        rotates = 0
        status = 'ShiftRow'
      }
    }
  })
  //남은 작업
  if (status === 'Rotate') {
    //누적된 rotate작업
    matrix.jumpRotate(rotates)
  } else {
    //누적된 shift작업
    for (let i = 0; i < shifts; i++) {
      matrix.shiftRow()
    }
  }
  answer = matrix.print()
  return answer
}
