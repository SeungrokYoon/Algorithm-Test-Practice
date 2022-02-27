//최소힙 구현
class MinHeap {
  constructor() {
    this.heap = []
  }
  insert(v) {
    this.heap.push(v)
    this.upHeap(this.heap.length - 1)
  }
  getMin() {
    if (this.heap.length === 0) return 0
    if (this.heap.length === 1) {
      const min = this.heap[0]
      this.heap.pop()
      return min
    }
    const min = this.heap[0]
    const temp = this.heap[this.heap.length - 1]
    this.heap.pop()
    this.heap[0] = temp
    this.downHeap(0)
    return min
  }
  print() {
    console.log(this.heap)
  }
  getSize() {
    return this.heap.length
  }
  upHeap(pos) {
    let parentIndex = parseInt((pos - 1) / 2)
    while (this.heap[parentIndex] > this.heap[pos]) {
      console.log(pos, parentIndex)
      const tmp = this.heap[pos]
      this.heap[pos] = this.heap[parentIndex]
      this.heap[parentIndex] = tmp
      pos = parentIndex
      parentIndex = parseInt((pos - 1) / 2)
    }
  }
  downHeap(pos) {
    let tmp = this.heap[pos],
      child
    while (pos < Math.floor(this.heap.length / 2)) {
      child = pos * 2 + 1
      if (child < this.heap.length && this.heap[child] > this.heap[child + 1]) child++
      if (tmp <= this.heap[child]) break
      this.heap[pos] = this.heap[child]
      pos = child
    }
    this.heap[pos] = tmp
  }
}

//최대힙 구현
class MaxHeap {
  constructor() {
    this.heap = []
  }
  insert(v) {
    this.heap.push(v)
    this.upHeap(this.heap.length - 1)
  }
  upHeap(pos) {
    while (this.heap[pos] > this.heap[parseInt((pos - 1) / 2)]) {
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
      if (childIndex + 1 < this.heap.length && this.heap[childIndex] < this.heap[childIndex + 1])
        childIndex++ //오른쪽 자식이 존재하고, 오른쪽 자식이 더 크면 오른쪽을 선택
      if (this.heap[pos] >= this.heap[childIndex]) break
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
}
