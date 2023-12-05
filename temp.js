const [[N, M], ...map] = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')
  .map((s) => s.split(' ').map(Number))

const NUMBER_OF_TETRONOMINO_SHAPE = 5

class Tetromino {
  constructor(map, N, M, sizeOfTetromino) {
    this.map = map
    this.height = N
    this.width = M
    this.tetrominoSize = sizeOfTetromino
    this.rows = [null, null, null, null]
    this.cols = [null, null, null, null]
    this.dRow = null
    this.dCol = null
    this.max = 0
  }
  initPosition({ startRow, startCol, dRow, dCol }) {
    this.rows[0] = startRow
    this.cols[0] = startCol
    this.dRow = dRow
    this.dCol = dCol
    for (let i = 1; i < this.tetrominoSize; i++) {
      this.rows[i] = startRow + dRow[i]
      this.cols[i] = startCol + dCol[i]
    }
  }
  searchWithRotation() {
    const rotationCounter = 4
    const isValid = (r, c) => r >= 0 && c >= 0 && r < this.height && c < this.width
    const isAllCoordsValid = () => {
      for (let i = 0; i < this.tetrominoSize; i++) {
        if (!isValid(this.rows[i], this.cols[i])) return false
      }
      return true
    }
    let counter = 0
    while (counter++ < rotationCounter) {
      if (isAllCoordsValid()) {
        let sum = 0
        const tempArr = Array.from({ length: N }, () => Array.from({ length: M }, () => 0))
        for (let i = 0; i < this.tetrominoSize; i++) {
          tempArr[this.rows[i]][[this.cols[i]]] = 1
          sum += this.map[this.rows[i]][this.cols[i]]
        }
        this.max = Math.max(this.max, sum)
      }
      this.updateCoords()
    }
  }
  updateCoords() {
    for (let i = 1; i < this.tetrominoSize; i++) {
      const rowDiff = this.rows[i] - this.rows[0]
      const colDiff = this.cols[i] - this.cols[0]
      this.rows[i] = this.rows[0] - colDiff
      this.cols[i] = this.cols[0] + rowDiff
    }
  }
  search(i, j, dRow, dCol) {
    this.initPosition({ startRow: i, startCol: j, dRow, dCol })
    this.searchWithRotation()
    this.flipByYAxis()
    this.searchWithRotation()
  }
  flipByYAxis() {
    for (let i = 1; i < this.tetrominoSize; i++) {
      const colDiff = this.cols[i] - this.cols[0]
      this.cols[i] = this.cols[0] - colDiff
    }
  }
  getMax() {
    return this.max
  }
}
const tetromino = new Tetromino(map, N, M, 4)
const dRows = [
  [0, 0, 0, 0],
  [0, 0, 1, 1],
  [0, 1, 2, 2],
  [0, 1, 1, 2],
  [0, 0, 0, 1],
]
const dCols = [
  [0, 1, 2, 3],
  [0, 1, 0, 1],
  [0, 0, 0, 1],
  [0, 0, 1, 1],
  [0, 1, 2, 1],
]

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    for (let delta = 0; delta < NUMBER_OF_TETRONOMINO_SHAPE; delta++) {
      tetromino.search(i, j, dRows[delta], dCols[delta])
    }
  }
}
console.log(tetromino.getMax())
