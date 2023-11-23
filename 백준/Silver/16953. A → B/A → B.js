const [A, B] = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split(' ')
  .map(Number)

const isDividableByTwo = (n) => n % 2 === 0
const divideByTwo = (n) => n / 2
const endsWithOne = (n) => n % 10 === 1 && n >= 1
const removeRightOne = (n) => Math.floor(n / 10)

let answer = 0
const queue = [[B, 0]]
while (queue.length) {
  const [n, count] = queue.pop()
  if (n === A) {
    answer = count
    break
  }
  if (n === 1) break

  if (isDividableByTwo(n)) {
    queue.push([divideByTwo(n), count + 1])
  }
  if (endsWithOne(n)) {
    queue.push([removeRightOne(n), count + 1])
  }
}

console.log(answer !== 0 ? answer + 1 : -1)
