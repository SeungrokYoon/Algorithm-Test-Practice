const input = require('fs')
  .readFileSync(process.platform == 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const N = +input[0]

const set = new Set()
const map = new Map()
input.slice(1).forEach((l) => {
  const [name, extension] = l.split('.')
  if (map.has(extension)) {
    const count = map.get(extension)
    map.set(extension, count + 1)
  } else {
    map.set(extension, 1)
    set.add(extension)
  }
})

const answer = Array.from(set)
  .sort()
  .map((key) => `${key} ${map.get(key)}`)
  .join('\n')

console.log(answer)
