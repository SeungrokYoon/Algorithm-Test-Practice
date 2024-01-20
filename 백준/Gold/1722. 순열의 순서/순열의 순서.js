const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const NUMBER_OF_DIGITS = +input[0]
const factorial = Array.from({ length: NUMBER_OF_DIGITS + 1 }, (_, i) => BigInt(i))
factorial[0] = 1
for (let i = 2; i <= NUMBER_OF_DIGITS; i++) {
  factorial[i] = BigInt(i) * factorial[i - 1]
}

const [CMD, ...QUESTION] = input[1].split(' ')

const solutionOne = (target) => {
  let pointer = 0
  const permutation = []
  const visited = Array(NUMBER_OF_DIGITS + 1).fill(0)
  while (pointer < NUMBER_OF_DIGITS) {
    for (let num = 1; num <= NUMBER_OF_DIGITS; num++) {
      if (visited[num]) continue
      const chancesThisNumCovers = factorial[NUMBER_OF_DIGITS - pointer - 1]
      const shouldGoFurtherThisNum = target > chancesThisNumCovers
      if (shouldGoFurtherThisNum) {
        target = BigInt(target - chancesThisNumCovers)
      } else if (!shouldGoFurtherThisNum) {
        permutation.push(num)
        visited[num] = 1
        break
      }
    }
    pointer++
  }
  return permutation.join(' ')
}

const solutionTwo = (targetArr) => {
  let pointer = 0
  let sum = BigInt(0)
  const visited = Array(NUMBER_OF_DIGITS + 1).fill(0)
  while (pointer < NUMBER_OF_DIGITS) {
    visited[targetArr[pointer]] = 1
    for (let i = 1; i < targetArr[pointer]; i++) {
      if (visited[i]) continue
      const numberOfChoices = NUMBER_OF_DIGITS - pointer
      const factorialForTheRestPosition = factorial[numberOfChoices - 1]
      sum += factorialForTheRestPosition
    }
    pointer++
  }
  return (sum + BigInt(1)).toString()
}

if (CMD === '1') {
  console.log(solutionOne(BigInt(QUESTION[0])))
} else {
  console.log(solutionTwo(QUESTION.map(Number)))
}
