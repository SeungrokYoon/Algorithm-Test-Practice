const [[N, M], numbers] = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')
  .map((s) => s.split(' ').map(Number))

const array = new Array(N).fill(0).map((v, i) => i + 1)

const rotateArr = (arr, target) => {
  while (arr[0] !== target) {
    arr.push(arr.shift())
  }
  arr.shift()
}

let answer = 0
for (let i = 0; i < M; i++) {
  const targetNum = numbers[i]
  const leftDist = array.length - array.indexOf(targetNum)
  const rightDist = array.indexOf(targetNum)
  const minDistance = Math.min(leftDist, rightDist)
  answer += minDistance
  rotateArr(array, targetNum)
}

console.log(answer)
