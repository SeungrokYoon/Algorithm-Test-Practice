const [N, K] = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split(' ')
  .map(Number)

class Node {
  constructor(num) {
    this.num = num
    this.next = null
  }
}

class Yosepus {
  constructor(N, K) {
    this.curr = null
    this.size = 0
    this.max = N
    this.step = K
  }
  insert(node) {
    if (this.size === 0) {
      this.curr = node
      this.size++
      return
    }
    const last = this.findLast()
    last.next = node
    this.size++
    if (this.size === this.max) node.next = this.curr
  }
  findLast() {
    let currentNode = this.curr
    for (let i = 0; i < this.size - 1; i++) {
      currentNode = currentNode.next
    }
    return currentNode
  }
  remove() {
    if (this.size === 1) {
      const result = this.curr.num
      this.curr = null
      this.size--
      return result
    }
    let curr = this.curr
    let prev = this.findLast()
    for (let i = 0; i < this.step - 1; i++) {
      prev = curr
      curr = curr.next
    }
    prev.next = curr.next
    this.curr = curr.next
    this.size--
    return curr.num
  }
}

const answer = []
const yosepus = new Yosepus(N, K)
for (let i = 1; i <= N; i++) {
  yosepus.insert(new Node(i))
}

let curr = yosepus.curr
for (let i = 0; i < N; i++) {
  curr = curr.next
}

while (yosepus.size !== 0) {
  const result = yosepus.remove()
  answer.push(result)
}

console.log('<' + answer.join(', ') + '>')
