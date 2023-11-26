const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const solution = (H, W, N) => {
  const floor = N % H === 0 ? H : N % H
  const room = Math.ceil(N / H)
  return floor.toString() + room.toString().padStart(2, '0')
}

console.log(
  input
    .slice(1)
    .reduce((acc, line) => {
      acc.push(solution(...line.split(' ').map(Number)))
      return acc
    }, [])
    .join('\n'),
)
