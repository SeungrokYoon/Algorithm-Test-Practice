// union-find 개념문제

const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  ouput: process.stdout,
})

const input = []
const answer = []
let n = 0
let m = 0
let count = 0

const findParent = (parent, x) => {
  if (parent[x] !== x) {
    parent[x] = findParent(parent, parent[x])
  }
  return parent[x]
}

const unionParent = (parent, a, b) => {
  const aRoot = findParent(parent, a)
  const bRoot = findParent(parent, b)
  if (aRoot > bRoot) {
    parent[aRoot] = bRoot
  } else {
    parent[bRoot] = aRoot
  }
}

const solution = () => {
  const parent = Array.from({ length: n + 1 }, (_, i) => i)
  input.forEach(([cmd, a, b]) => {
    if (cmd === 0) {
      unionParent(parent, a, b)
    } else {
      answer.push(findParent(parent, a) === findParent(parent, b) ? 'YES' : 'NO')
    }
  })
  console.log(answer.join('\n'))
}

rl.on('line', (l) => {
  if (count === 0) {
    let nm = l.split(' ').map(Number)
    n = nm[0]
    m = nm[1]
  } else {
    input.push(l.split(' ').map(Number))
  }
  count++
}).on('close', () => {
  solution()
  process.exit()
})
