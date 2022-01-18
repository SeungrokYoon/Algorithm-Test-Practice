const [[N, M], cards] = require('fs')
  .readFileSync(__dirname + '/test.txt')
  .toString()
  .trim()
  .split('\n')
  .map((i) => i.split(' ').map((j) => +j))

const solution = (N, M, cards) => {
  let closestSum = 0
  const length = cards.length
  for (let first = 0; first < length - 2; first++) {
    for (let second = first + 1; second < length - 1; second++) {
      for (let third = second + 1; third < length; third++) {
        const tempSum = cards[first] + cards[second] + cards[third]
        if (tempSum > closestSum && tempSum <= M) closestSum = tempSum
      }
    }
  }
  return closestSum
}

console.log(solution(N, M, cards))
