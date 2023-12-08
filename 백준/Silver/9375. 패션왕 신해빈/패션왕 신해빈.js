const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const CASES = +input[0]
const answer = []
const solution = (clothes) => {
  const map = new Map()
  clothes.forEach((element) => {
    const [value, key] = element.split(' ')
    map.has(key) ? map.set(key, map.get(key) + 1) : map.set(key, 1)
  })

  let total = 1
  map.forEach((value) => {
    total *= value + 1
  })
  return total - 1
}

for (let i = 1; i < input.length; i++) {
  const lines = +input[i]
  const combis = solution(input.slice(i + 1, i + 1 + lines))
  answer.push(combis)
  i += lines
}

console.log(answer.join('\n'))
