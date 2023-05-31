const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')
input.shift()

class Deque {
  constructor() {
    this.deque = []
    this.log = []
    this.frontPointer = 0
    this.size = 0
  }
  pushBack(value) {
    this.deque.push(value)
    this.size++
  }
  pushFront(value) {
    this.deque.unshift(value)
    this.size++
  }
  popBack() {
    const popped = this.size ? this.deque.pop() : -1
    this.size ? this.size-- : ''
    this.log.push(popped)
  }
  popFront() {
    const popped = this.size ? this.deque.shift() : -1
    this.size ? this.size-- : ''
    this.log.push(popped)
  }
  getSize() {
    this.log.push(this.size)
  }
  empty() {
    this.log.push(Number(this.size === 0))
  }
  front() {
    this.log.push(this.size ? this.deque[this.frontPointer] : -1)
  }
  back() {
    this.log.push(this.size ? this.deque[this.deque.length - 1] : -1)
  }
}

function solution(commands) {
  const deque = commands.reduce((deque, command) => {
    if (command.startsWith('push_back')) {
      const value = command.split(' ')[1] * 1
      deque.pushBack(value)
    } else if (command.startsWith('push_front')) {
      const value = command.split(' ')[1] * 1
      deque.pushFront(value)
    } else if (command.startsWith('pop_front')) {
      deque.popFront()
    } else if (command.startsWith('pop_back')) {
      deque.popBack()
    } else if (command === 'size') {
      deque.getSize()
    } else if (command === 'empty') {
      deque.empty()
    } else if (command === 'front') {
      deque.front()
    } else if (command === 'back') {
      deque.back()
    }
    return deque
  }, new Deque())
  return deque.log.join('\n')
}

console.log(solution(input))
