const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const [R, C] = input[0].split(' ').map(Number)
const map = input.slice(1).map((l) => l.split(''))
const words = []
for (let i = 0; i < R; i++) {
  let rowWord = ''
  for (let j = 0; j < C; j++) {
    if (map[i][j] === '#' && rowWord.length < 2) {
      rowWord = ''
      continue
    }
    if (map[i][j] === '#' && rowWord.length >= 2) {
      words.push(rowWord)
      rowWord = ''
      continue
    }
    rowWord += map[i][j]
  }
  rowWord.length >= 2 && words.push(rowWord)
}

for (let c = 0; c < C; c++) {
  let colWord = ''
  for (let r = 0; r < R; r++) {
    if (map[r][c] === '#' && colWord.length < 2) {
      colWord = ''
      continue
    }
    if (map[r][c] === '#' && colWord.length >= 2) {
      words.push(colWord)
      colWord = ''
      continue
    }
    colWord += map[r][c]
  }
  colWord.length >= 2 && words.push(colWord)
}

console.log(words.sort()[0])
