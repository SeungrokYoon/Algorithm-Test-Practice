const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const N = +input[0]
const nums = input[1].split(' ').map(Number)

const getNext = (current) => (current + 1) % 3

let max = 0
for (let i = 0; i < N; i++) {
  if (nums[i] !== 0) continue
  let counter = 1
  let target = getNext(nums[i])
  for (let j = i + 1; j < N; j++) {
    if (nums[j] === target) {
      counter++
      target = getNext(target)
    }
  }
  max = Math.max(max, counter)
}

console.log(max)
