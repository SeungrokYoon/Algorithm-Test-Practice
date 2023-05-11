//S3: 통계학 https://www.acmicpc.net/problem/2108

const targetDirectory = process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt'
const input = require('fs').readFileSync(targetDirectory).toString().trim().split('\n').map(Number)
const N = input.shift()

input.sort((a, b) => a - b)
let sum = 0
const size = input.length
const frequency = {}
const min = input[0]
const max = input[size - 1]
const isEven = input.length % 2 === 0
let maxFrequencyCounter = 0

input.forEach((num) => {
  sum += num
  frequency[num] ? frequency[num]++ : (frequency[num] = 1)
  maxFrequencyCounter = Math.max(maxFrequencyCounter, frequency[num])
})

const average = Math.round(sum / size)
const middle = isEven
  ? (input[Math.floor(size / 2)] + input[Math.floor(size / 2) - 1]) / 2
  : input[Math.floor(size / 2)]
const mostFrequentNumberList = Object.entries(frequency)
  .filter((entryArr) => entryArr[1] === maxFrequencyCounter)
  .map((entryArr) => parseInt(entryArr[0]))
  .sort((a, b) => a - b)

const mostFrequentNumber =
  mostFrequentNumberList.length > 1 ? mostFrequentNumberList[1] : mostFrequentNumberList[0]
const range = max - min

console.log(parseInt(average))
console.log(middle)
console.log(mostFrequentNumber)
console.log(range)
