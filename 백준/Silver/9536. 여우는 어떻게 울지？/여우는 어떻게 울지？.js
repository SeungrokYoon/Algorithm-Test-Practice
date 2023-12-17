const input = require('fs').readFileSync('dev/stdin').toString().trim().split('\n')
const N = +input[0]
let idx = 1
const answer = []
while (idx < input.length) {
  const str = input[idx++].split(' ')
  const data = []
  while (!input[idx].endsWith('?')) {
    data.push(input[idx++].split(' ')[2])
  }
  const soundSet = new Set(data)
  const foxSound = str.reduce((acc, curr) => {
    if (!soundSet.has(curr)) return (acc += curr + ' ')
    return acc
  }, '')
  answer.push(foxSound.trim())
  idx++
}
console.log(answer.join('\n'))
