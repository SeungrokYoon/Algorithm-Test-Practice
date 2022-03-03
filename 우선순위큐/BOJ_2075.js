class MinHeap {
  constructor() {
    this.heap = []
  }
  insert(v) {
    this.heap.push(v)
    this.upHeap()
  }
  pop() {
    if (this.heap.length === 0) return null
    if (this.heap.length === 1) {
      return this.heap.pop()
    }
    const min = this.heap[0]
    this.heap[0] = this.heap[this.heap.length - 1]
    this.heap.pop()
    this.downHeap()
    return min
  }
  upHeap() {
    let pos = this.heap.length - 1
    while (this.heap[pos] < this.heap[Math.floor((pos - 1) / 2)]) {
      const temp = this.heap[pos]
      this.heap[pos] = this.heap[Math.floor((pos - 1) / 2)]
      this.heap[Math.floor((pos - 1) / 2)] = temp
      pos = Math.floor((pos - 1) / 2)
    }
  }
  downHeap() {
    if (!this.heap.length) return
    let pos = 0
    while (pos < Math.floor(this.heap.length / 2)) {
      let child = pos * 2 + 1
      //최소힙에서는 더 작은 자식을 선택
      if (child + 1 < this.heap.length && this.heap[child] > this.heap[child + 1]) child++
      if (this.heap[child] >= this.heap[pos]) break
      const temp = this.heap[pos]
      this.heap[pos] = this.heap[child]
      this.heap[child] = temp
      pos = child
    }
  }
  size() {
    return this.heap.length
  }
  front() {
    return this.heap.length ? this.heap[0] : null
  }
}

const readline = require('readline')
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
let N = 0
let lineCounter = 0
const minHeap = new MinHeap()
rl.on('line', (line) => {
  line
    .split(' ')
    .map(Number)
    .forEach((num, _, arr) => {
      if (lineCounter === 0) {
        N = num
      } else {
        if (minHeap.size() < N) {
          minHeap.insert(num)
        } else if (minHeap.front() < num) {
          minHeap.pop()
          minHeap.insert(num)
        }
      }
      lineCounter++
    })
}).on('close', () => {
  console.log(minHeap.pop())
  process.exit()
})
