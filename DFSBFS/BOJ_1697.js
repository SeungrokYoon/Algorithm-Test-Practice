const [N, K] = require('fs')
  .readFileSync(__dirname + '/test.txt')
  .toString()
  .trim()
  .split(' ')
  .map(Number)

const MAX = 100001
const solution = (n, k) => {
  const table = new Array(MAX).fill(-1)
  const queue = []
  table[n] = 0
  queue.push(n)
  let index = 0
  while (index < queue.length) {
    const popped = queue[index]
    const time = table[popped]
    if (popped === k) {
      break
    }
    if (table[popped - 1] === -1 && popped - 1 >= 0) {
      table[popped - 1] = time + 1
      queue.push(popped - 1)
    }
    if (table[popped + 1] === -1 && popped + 1 < MAX) {
      table[popped + 1] = time + 1
      queue.push(popped + 1)
    }
    if (table[popped * 2] === -1 && popped * 2 < MAX) {
      table[popped * 2] = time + 1
      queue.push(popped * 2)
    }
    index++
  }
  return table[k]
}

console.log(solution(N, K))
