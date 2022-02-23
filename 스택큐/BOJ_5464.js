const input = require('fs')
  .readFileSync(__dirname + '/test.txt')
  .toString()
  .trim()
  .split('\n')

const [N, M] = input.shift().split(' ').map(Number)
const price = input.slice(0, N).map(Number)
const weight = [0].concat(input.slice(N, N + M).map(Number))
const schedule = input.slice(N + M).map(Number)
const solution = () => {
  let totalPrice = 0
  const cars = Array.from({ length: M + 1 }, () => -1)
  const emptySlots = Array.from({ length: N }, (_, index) => index)
  const waiting = []
  for (let i = 0; i < 2 * M; i++) {
    const next = schedule[i]
    if (next < 0) {
      emptySlots.push(cars[next * -1])
      cars[next * -1] = -1
    } else {
      waiting.push(next)
    }
    while (emptySlots.length && waiting.length) {
      const input = waiting.shift()
      const theLowestEmptySlot = emptySlots.sort((a, b) => b - a).pop()
      cars[input] = theLowestEmptySlot
      totalPrice += price[theLowestEmptySlot] * weight[input]
    }
  }
  return totalPrice
}

console.log(solution())
