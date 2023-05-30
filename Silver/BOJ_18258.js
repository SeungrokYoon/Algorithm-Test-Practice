const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

input.shift()
const answer = []
input.reduce((acc, curr) => {
  const value = curr.split(' ')[1] * 1
  switch (curr) {
    case 'front':
      answer.push(acc.length ? acc[0] : -1)
      break
    case 'back':
      answer.push(acc.length ? acc[acc.length - 1] : -1)
      break
    case 'size':
      answer.push(acc.length)
      break
    case 'empty':
      answer.push(Number(acc.length === 0))
      break
    case 'pop':
      answer.push(acc.length ? acc[0] : -1)
      acc.shift()
      break
    default:
      acc.push(value)
  }
  return acc
}, [])

console.log(answer.join('\n'))
