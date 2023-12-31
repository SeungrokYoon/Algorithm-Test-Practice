const [A, K] = require('fs')
  .readFileSync(process.platform == 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split(' ')
  .map(Number)

const queue = [[K, 0]]

let answer = 0
const visited = Array.from({ length: 1000000 + 1 }, () => 0)
visited[K] = 1
while (queue.length) {
  const [popped, count] = queue.shift()
  if (popped === A) {
    answer = count
    break
  }

  const nextNum1 = popped - 1
  if (nextNum1 > 0 && !visited[nextNum1]) {
    visited[nextNum1] = 1
    queue.push([nextNum1, count + 1])
  }
  if (popped % 2 === 0) {
    const nextNum2 = popped / 2
    if (nextNum2 > 0 && !visited[nextNum2]) {
      visited[nextNum2] = 1
      queue.push([nextNum2, count + 1])
    }
  }
}

console.log(answer)
