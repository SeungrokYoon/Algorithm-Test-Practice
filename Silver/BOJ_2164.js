const input =
  require('fs')
    .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
    .toString()
    .trim() * 1

function solution(n) {
  const queue = new Array(n).fill(0).map((v, i) => i + 1)
  let index = 0
  while (queue.length - index > 1) {
    index++
    const popped = queue[index++]
    queue.push(popped)
  }
  return queue[index]
}

console.log(solution(input))
