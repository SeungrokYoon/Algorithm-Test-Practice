const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n')
input.pop()

const solution = (k, numbers) => {
  //numbers 에 있는 수들 중, 6 개를 선택해야 한다
  const getCombis = (arr) => {
    const queue = [...numbers.map((i) => [+i])]
    let queuePointer = 0
    while (queue[queuePointer].length < 6) {
      const dequeued = queue[queuePointer]
      for (let nextNum of arr) {
        if (dequeued[dequeued.length - 1] < nextNum) queue.push([...dequeued, nextNum])
      }
      queuePointer += 1
    }
    return queue.slice(queuePointer)
  }
  const subResult = getCombis(numbers)
  subResult.forEach((combi) => {
    console.log(combi.join(' '))
  })
  console.log()
}

for (let numberString of input) {
  const [k, ...numbers] = numberString.split(' ')
  solution(
    +k,
    numbers.map((i) => +i),
  )
}
