const input = require('fs')
  .readFileSync(process.platform == 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')
  .map((l) => l.split(' ').map(Number))

const [N, M] = input[0]
let boxes = 1
let restWeight = M
while (N > 0 && input[1].length) {
  const currBookWeight = input[1].pop()
  if (currBookWeight <= restWeight) {
    restWeight -= currBookWeight
  } else {
    boxes++
    restWeight = M - currBookWeight
  }
}
console.log(N === 0 ? 0 : boxes)
