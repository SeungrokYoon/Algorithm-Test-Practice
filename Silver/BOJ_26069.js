//S4: 붙임성 좋은 총총이 https://www.acmicpc.net/problem/26069
const targetDirectory = process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt'
const input = require('fs').readFileSync(targetDirectory).toString().trim().split('\n')
const N = input.shift()

const peopleMap = new Map()

input.forEach((line) => {
  const [personA, personB] = line.split(' ')
  if (!peopleMap.has(personA)) {
    peopleMap.set(personA, personA === 'ChongChong' ? 1 : 0)
  }
  if (!peopleMap.has(personB)) {
    peopleMap.set(personB, personB === 'ChongChong' ? 1 : 0)
  }
  if (peopleMap.get(personA) === 1) {
    peopleMap.get(personB) === 0 ? peopleMap.set(personB, 1) : ''
  }
  if (peopleMap.get(personB) === 1) {
    peopleMap.get(personA) === 0 ? peopleMap.set(personA, 1) : ''
  }
})

let answer = 0

peopleMap.forEach((value, key) => (value === 1 ? answer++ : ''))
console.log(answer)
