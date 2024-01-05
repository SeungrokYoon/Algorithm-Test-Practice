const input = require('fs')
  .readFileSync(process.platform == 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const [N, C] = input[0].split(' ').map(Number)
const map = new Map()
const arr = input[1].split(' ').map(Number)
arr.forEach((n, i) => {
  if (map.has(n)) {
    const [advent, idx] = map.get(n)
    map.set(n, [advent + 1, idx])
  } else {
    map.set(n, [1, i])
  }
})
arr.sort((a, b) => map.get(b)[0] - map.get(a)[0] || map.get(a)[1] - map.get(b)[1])
console.log(arr.join(' '))
