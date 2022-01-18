const [[N, M], cards] = require('fs')
  .readFileSync(__dirname + '/test.txt')
  .toString()
  .trim()
  .split('\n')
  .map((i) => i.split(' ').map((j) => +j))

const solution = (N, M, cards) => {
  let closestSum = 0
  for (let count = 0; count < Math.pow(2, cards.length); count++) {
    let cardCounter = 0
    let tempSum = 0
    for (let j = 0; j < cards.length; j++) {
      if (count & (1 << j)) {
        tempSum += cards[j]
        cardCounter++
      }
    }
    if (cardCounter === 3 && tempSum > closestSum && tempSum < M) closestSum = tempSum
  }
  return closestSum
}

console.log(solution(N, M, cards))
