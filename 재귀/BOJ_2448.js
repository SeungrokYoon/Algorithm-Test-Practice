const N = require('fs').readFileSync('/dev/stdin').toString().trim() * 1
const map = Array.from({ length: N }, () => Array.from({ length: 2 * N }, () => ' '))
const baseFractal = ['  *   ', ' * *  ', '***** ']

const makeFractal = (row, col, height) => {
  if (height === 3) {
    //base case
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 6; j++) {
        map[row + i][col + j] = baseFractal[i][j]
      }
    }
    return
  }
  makeFractal(row, col + 0.5 * height, 0.5 * height)
  makeFractal(row + 0.5 * height, col, 0.5 * height)
  makeFractal(row + 0.5 * height, col + height, 0.5 * height)
}
makeFractal(0, 0, N)

const result = map.reduce((prev, current) => prev + current.join('') + '\n', '')
console.log(result)
