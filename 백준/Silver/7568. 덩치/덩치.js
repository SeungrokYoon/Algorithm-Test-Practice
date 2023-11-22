const inputArr = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')
  .map((s) => s.split(' ').map(Number))

const biggerPeople = []

for (let i = 1; i < inputArr.length; i++) {
  let count = 0
  for (let j = 1; j < inputArr.length; j++) {
    if (i == j) continue
    const [kg, cm] = inputArr[i]
    const [nkg, ncm] = inputArr[j]
    if (kg < nkg && cm < ncm) count++
  }
  biggerPeople.push(count)
}

console.log(biggerPeople.map((k) => k + 1).join(' '))
