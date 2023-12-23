const input = require('fs')
  .readFileSync(process.platform == 'linux' ? 'dev/stdin' : __dirname + '/../input.txt')
  .toString()
  .trim()
  .split('\n')

const F = (n) => [
  Math.floor(n / 1000),
  Math.floor((n % 1000) / 100),
  Math.floor((n % 100) / 10),
  n % 10,
]
const D = (n) => [(2 * n) % 10000, 'D']
const S = (n) => [n == 0 ? 9999 : n - 1, 'S']
const L = (n) => {
  const [a, b, c, d] = F(n)
  return [b * 1000 + c * 100 + d * 10 + a, 'L']
}
const R = (n) => {
  const [a, b, c, d] = F(n)
  return [d * 1000 + a * 100 + b * 10 + c, 'R']
}
const DSLR = [(n) => D(n), (n) => S(n), (n) => L(n), (n) => R(n)]

const answer = []
input.slice(1).forEach((line) => {
  const [A, B] = line.split(' ').map(Number)
  const queue = [[A, '']]
  const visited = Array(10000).fill(0)
  visited[A] = 1

  let head = 0
  while (queue.length > head) {
    const [now, history] = queue[head++]
    if (now === B) {
      answer.push(history)
      break
    }

    for (let i = 0; i < 4; i++) {
      const [next, cmd] = DSLR[i](now)
      if (-1 < next && next < 10000 && !visited[next]) {
        queue.push([next, history + cmd])
        visited[next] = 1
      }
    }
  }
})

console.log(answer.join('\n'))