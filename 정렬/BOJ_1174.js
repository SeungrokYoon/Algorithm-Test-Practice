const input = parseInt(require('fs').readFileSync('/dev/stdin').toString().trim())

const solution = (N) => {
  let pointer = 0
  const queue = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  while (pointer < queue.length && queue[pointer].length < 11) {
    const popped = queue[pointer]
    for (let index = 0; index < 10; index++) {
      if (1 * queue[index] > 1 * popped[0]) queue.push(queue[index] + popped)
    }
    pointer++
  }
  if (queue.length < N) return -1
  return queue.map((i) => +i).sort((a, b) => a - b)[N - 1]
}

console.log(solution(input))
