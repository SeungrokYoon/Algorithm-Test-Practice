const input = require('fs')
  .readFileSync(process.platform == 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const [N, C] = input[0].split(' ').map(Number)
const map = new Map()
input.slice(1).forEach((studentNum, i) => {
  map.set(studentNum, i)
})
const mapArr = Array.from(map).sort((a, b) => a[1] - b[1])
console.log(
  mapArr
    .slice(0, N)
    .map(([v, i]) => v)
    .join('\n'),
)
