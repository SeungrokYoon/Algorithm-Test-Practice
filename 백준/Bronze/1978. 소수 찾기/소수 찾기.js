const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const N = +input[0]
const data = input[1].split(' ').map(Number)
const lastNum = Math.max(...data) + 1
const erastotenes = Array.from({ length: lastNum }, () => 0)
erastotenes[0] = 1
erastotenes[1] = 1

for (let i = 2; i < lastNum; i++) {
  for (let k = 2; k * i < lastNum; k++) {
    erastotenes[i * k] = 1
  }
}

const answer = data.reduce((acc, curr) => {
  if (erastotenes[curr] === 0) return acc + 1
  return acc
}, 0)

console.log(answer)
