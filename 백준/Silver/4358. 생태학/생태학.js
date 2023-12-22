const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const map = new Map()
const set = new Set()
input.forEach((tree) => {
  map.has(tree) ? map.set(tree, map.get(tree) + 1) : map.set(tree, 1)
  set.add(tree)
})

console.log(
  Array.from(set.values())
    .sort()
    .map((tree) => `${tree} ${((map.get(tree) / input.length) * 100).toFixed(4)}`)
    .join('\n'),
)
