const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const N = +input[0]
const data = input[1].split(' ').map(Number)

class Node {
  constructor(value, index) {
    this.value = value
    this.index = index
    this.prev = null
    this.next = null
    this.shot = false
  }
  getPrev() {
    return this.prev
  }
  getNext() {
    return this.next
  }
  shoot() {
    this.shot = true
  }
}

class Deque {
  constructor() {
    this.head = null
    this.rear = null
    this.length = 0
  }
  pushRear(num, i) {
    const nextNode = new Node(num, i)
    if (this.length === 0) {
      this.head = nextNode
      this.rear = nextNode
    } else {
      this.rear.next = nextNode
      nextNode.prev = this.rear
      this.rear = nextNode
    }
    this.length++
  }
}

class BalloonTable {
  constructor(arr, N) {
    this.remaining = N
    this.deque = new Deque()
    this.curr = null
    this.history = []
    this.init(arr)
  }
  init(data) {
    data.forEach((v, i) => {
      this.deque.pushRear(v, i)
    })
    this.deque.head.prev = this.deque.rear
    this.deque.rear.next = this.deque.head
    this.curr = this.deque.head
  }
  moveToNextUnshotBalloon() {
    this.curr.shoot()
    this.history.push(this.curr.index + 1)
    this.remaining--
    let move = Math.abs(this.curr.value)
    const direction = this.curr.value > 0 ? 1 : -1
    while (move > 0 && this.remaining) {
      if (direction > 0) {
        if (!this.curr.getNext().shot) {
          move--
        }
        this.curr = this.curr.getNext()
      } else if (direction < 0) {
        if (!this.curr.getPrev().shot) {
          move--
        }
        this.curr = this.curr.getPrev()
      }
    }
  }
}

const bt = new BalloonTable(data, N)
for (let i = 0; i < N; i++) {
  bt.moveToNextUnshotBalloon()
}

console.log(bt.history.join(' '))
