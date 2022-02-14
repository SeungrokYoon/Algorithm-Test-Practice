const [N, K] = require('fs')
  .readFileSync(__dirname + '/test.txt')
  .toString()
  .trim()
  .split(' ')
  .map(Number)

const solution = (n, k) => {
  let pointer = 0
  const queue = []
  queue.push([n, 0])
  while (pointer < queue.length) {
    const [position, time] = queue[pointer]
    if (position === k) return time
    queue.push([position - 1, time + 1])
    queue.push([position + 1, time + 1])
    queue.push([position * 2, time + 1])
    pointer++
  }
}

console.log(solution(N, K))
