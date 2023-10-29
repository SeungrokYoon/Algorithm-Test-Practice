const [firstStr, secondStr] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const dpTable = Array.from({ length: firstStr.length + 1 }, () =>
  Array.from({ length: secondStr.length + 1 }, () => 0),
)

for (let row = 1; row < firstStr.length + 1; row++) {
  for (let col = 1; col < secondStr.length + 1; col++) {
    const rowChar = firstStr[row - 1]
    const colChar = secondStr[col - 1]
    dpTable[row][col] =
      rowChar === colChar
        ? Math.max(dpTable[row - 1][col - 1] + 1, dpTable[row][col - 1], dpTable[row - 1][col])
        : Math.max(dpTable[row - 1][col - 1], dpTable[row][col - 1], dpTable[row - 1][col])
  }
}

console.log(dpTable[firstStr.length][secondStr.length])
