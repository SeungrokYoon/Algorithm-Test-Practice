const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')
  .map(Number)

function recursion(arr, left, right) {
  if (left === right) return
  const block = (right - left + 1) / 3
  recursion(arr, left, left + block - 1)
  for (let i = left + block; i < left + 2 * block; i++) {
    arr[i] = ' '
  }
  recursion(arr, right - block + 1, right)
}

function solution(n) {
  const array = new Array(3 ** n).fill('-')
  recursion(array, 0, array.length - 1)
  return array.join('')
}

input.forEach((n) => console.log(solution(n)))
