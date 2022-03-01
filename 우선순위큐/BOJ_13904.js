class MaxDateHeap {
  constructor() {
    this.heap = []
  }
  insert(v) {
    this.heap.push(v)
    this.upHeap(this.heap.length - 1)
  }
  upHeap(pos) {
    while (this.heap[pos].date > this.heap[parseInt((pos - 1) / 2)].date) {
      const temp = this.heap[pos]
      this.heap[pos] = this.heap[parseInt((pos - 1) / 2)]
      this.heap[parseInt((pos - 1) / 2)] = temp
      pos = parseInt((pos - 1) / 2)
    }
  }
  getMax() {
    if (this.heap.length === 0) return 0
    if (this.heap.length === 1) {
      const max = this.heap[0]
      this.heap.pop()
      return max
    }
    const max = this.heap[0]
    this.heap[0] = this.heap[this.heap.length - 1]
    this.heap.pop()
    this.downHeap(0)
    return max
  }
  downHeap(pos) {
    while (pos < Math.floor(this.heap.length / 2)) {
      let childIndex = pos * 2 + 1 //왼쪽자식의 인덱스 pos 가 Math.floor(this.heap.length/2) 라 무조건 왼쪽 자식은 있음
      //자식 중 더 큰 자식 구하기,
      if (
        childIndex + 1 < this.heap.length &&
        this.heap[childIndex].date < this.heap[childIndex + 1].date
      )
        childIndex++ //오른쪽 자식이 존재하고, 오른쪽 자식이 더 크면 오른쪽을 선택
      if (this.heap[pos].date >= this.heap[childIndex].date) break
      //만약 선택된 노드값이 교환할 수 없다면 break
      const temp = this.heap[pos]
      this.heap[pos] = this.heap[childIndex]
      this.heap[childIndex] = temp
      pos = childIndex
    }
  }
  print() {
    console.log(this.heap)
  }
  size() {
    console.log(this.heap.length)
  }
  getFront() {
    return this.heap.length ? this.heap[0] : -1
  }
}
class MaxScoreHeap {
  constructor() {
    this.heap = []
  }
  insert(v) {
    this.heap.push(v)
    this.upHeap(this.heap.length - 1)
  }
  upHeap(pos) {
    while (this.heap[pos].score > this.heap[parseInt((pos - 1) / 2)].score) {
      const temp = this.heap[pos]
      this.heap[pos] = this.heap[parseInt((pos - 1) / 2)]
      this.heap[parseInt((pos - 1) / 2)] = temp
      pos = parseInt((pos - 1) / 2)
    }
  }
  getMax() {
    if (this.heap.length === 0) return 0
    if (this.heap.length === 1) {
      const max = this.heap[0]
      this.heap.pop()
      return max
    }
    const max = this.heap[0]
    this.heap[0] = this.heap[this.heap.length - 1]
    this.heap.pop()
    this.downHeap(0)
    return max
  }
  downHeap(pos) {
    while (pos < Math.floor(this.heap.length / 2)) {
      let childIndex = pos * 2 + 1 //왼쪽자식의 인덱스 pos 가 Math.floor(this.heap.length/2) 라 무조건 왼쪽 자식은 있음
      //자식 중 더 큰 자식 구하기,
      if (
        childIndex + 1 < this.heap.length &&
        this.heap[childIndex].score < this.heap[childIndex + 1].score
      )
        childIndex++ //오른쪽 자식이 존재하고, 오른쪽 자식이 더 크면 오른쪽을 선택
      if (this.heap[pos].score >= this.heap[childIndex].score) break
      //만약 선택된 노드값이 교환할 수 없다면 break
      const temp = this.heap[pos]
      this.heap[pos] = this.heap[childIndex]
      this.heap[childIndex] = temp
      pos = childIndex
    }
  }
  print() {
    console.log(this.heap)
  }
  size() {
    return this.heap.length
  }
}

const input = require('fs')
  .readFileSync(__dirname + '/test.txt')
  .toString()
  .trim()
  .split('\n')
const N = input.shift() * 1
const solution = () => {
  let result = 0
  const maxDateHeap = new MaxDateHeap()
  const maxScoreHeap = new MaxScoreHeap()
  for (let i = 0; i < N; i++) {
    const [date, score] = input[i].split(' ').map(Number)
    const data = { date, score }
    maxDateHeap.insert(data)
  }
  //높은 날짜별로 maxDateHeap 에서 뽑아서 maxValueHeap 에 추가 후 pop한 것이 해당 날짜에서 얻을 수 있는 가장 큰 점수임
  const finalDate = maxDateHeap.getFront().date
  for (let i = finalDate; i >= 1; i--) {
    while (maxDateHeap.getFront().date >= i) {
      maxScoreHeap.insert(maxDateHeap.getMax())
    }
    if (!maxScoreHeap.size()) continue
    result += maxScoreHeap.getMax().score
  }
  return result
}

console.log(solution())
