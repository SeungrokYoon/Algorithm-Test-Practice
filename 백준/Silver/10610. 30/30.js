const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()

const map = new Map()
for (let i = 0; i < input.length; i++) {
  const numberIndex = parseInt(input[i])
  map.has(numberIndex) ? map.set(numberIndex, map.get(numberIndex) + 1) : map.set(numberIndex, 1)
}
let totalSumOfEachDigit = 0
map.forEach((value, key) => {
  totalSumOfEachDigit += value * key
})

const isValid = totalSumOfEachDigit % 3 === 0 && map.has(0)

const genAnswer = (map) => {
  let str = ''
  for (let i = 9; i >= 0; i--) {
    str += i.toString().repeat(map.has(i) ? map.get(i) : 0)
  }
  return str
}

const answer = isValid ? genAnswer(map) : -1
console.log(answer)
