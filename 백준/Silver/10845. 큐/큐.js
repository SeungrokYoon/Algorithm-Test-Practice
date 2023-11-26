const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

class Queue {
  constructor() {
    this.queue = []
    this.history = []
  }
  push(n) {
    this.queue.push(n)
  }
  pop() {
    return this.size() ? this.queue.shift() : -1
  }
  size() {
    return this.queue.length
  }
  empty() {
    return this.size() === 0 ? 1 : 0
  }
  front() {
    return this.size() === 0 ? -1 : this.queue[0]
  }
  back() {
    return this.size() === 0 ? -1 : this.queue[this.queue.length - 1]
  }
  updateHistory(result) {
    this.history.push(result)
  }
  printHistory() {
    return this.history.join('\n')
  }
}

const answer = input
  .slice(1)
  .reduce((queue, command) => {
    if (command.startsWith('push')) {
      queue.push(command.split(' ').map(Number)[1])
    } else {
      switch (command) {
        case 'pop':
          queue.updateHistory(queue.pop())
          break
        case 'size':
          queue.updateHistory(queue.size())
          break
        case 'empty':
          queue.updateHistory(queue.empty())
          break
        case 'front':
          queue.updateHistory(queue.front())
          break
        case 'back':
          queue.updateHistory(queue.back())
          break
      }
    }
    return queue
  }, new Queue())
  .printHistory()

console.log(answer)
