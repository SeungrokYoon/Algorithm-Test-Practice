const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n')
const k = parseInt(input[0])
const arr = input[1].split(' ')

const solution = (k, arr) => {
  const queue = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  let dequeuePointer = 0
  while (queue[dequeuePointer].length < k + 1) {
    const dequeued = queue[dequeuePointer]
    for (let newNum = 0; newNum < 10; newNum++) {
      if (!dequeued.includes('' + newNum)) {
        const comparison =
          arr[dequeued.length - 1] === '>'
            ? dequeued[dequeued.length - 1] > newNum
            : dequeued[dequeued.length - 1] < newNum
        if (comparison) {
          queue.push(dequeued + newNum)
        }
      }
    }
    dequeuePointer += 1
  }

  console.log(queue[queue.length - 1])
  console.log(queue[dequeuePointer])
}

solution(k, arr)
