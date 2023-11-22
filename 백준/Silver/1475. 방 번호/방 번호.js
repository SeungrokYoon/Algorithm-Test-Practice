const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()

const map = new Map()
for (let i = 0; i < input.length; i++) {
  const num = +input[i] === 9 || +input[i] === 6 ? 6 : +input[i]
  map.has(num) ? map.set(num, map.get(num) + 1) : map.set(num, 1)
}

map.has(6) ? map.set(6, Math.ceil(map.get(6) / 2)) : ''

console.log(Math.max(...map.values()))
