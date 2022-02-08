const input = require('fs')
  .readFileSync(__dirname + '/test.txt')
  .toString()
  .trim()
  .split('\n')

const N = input.shift()

const current = input[0]
const target = input[1]

const solution = (N, current, target) => {
  const change = (i, currentStr) => {
    const current = currentStr.split('').map((i) => +i)
    if (i - 1 >= 0) current[i - 1] = (current[i - 1] + 1) % 2
    current[i] = (current[i] + 1) % 2
    if (i + 1 < N) current[i + 1] = (current[i + 1] + 1) % 2
    return [...current].join('')
  }
  const stack = []
  stack.push({ bulbStr: change(0, current), count: 1, prev: 0 })
  let counter = 0
  while (stack.length) {
    const { bulbStr, count, prev } = stack.pop()
    for (let i = 0; i < N; i++) {
      if (i !== prev) {
        const nextStr = change(i, bulbStr)
        if (nextStr === target) return count + 1
        const nextObj = { bulbStr: nextStr, count: count + 1, prev: i }
        stack.push(nextObj)
      }
    }
  }
  return -1
}

console.log(solution(N, current, target))
