const [N, K] = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split(' ')
  .map(Number)

const queue = new Array(N).fill(0).map((v, i) => ({ value: i + 1, visited: false }))
const answer = []

let currentIndex = 0
let counter = 0

while (answer.length < N) {
  const notVisited = !queue[currentIndex].visited
  notVisited ? counter++ : ''
  if (counter === K) {
    const currentNode = queue[currentIndex]
    currentNode.visited = true
    answer.push(currentNode.value)
    counter = 0
  }
  currentIndex = (currentIndex + 1) % N
}

console.log('<' + answer.join(', ') + '>')
