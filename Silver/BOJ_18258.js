const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

input.shift()

input.reduce((acc, curr) => {
  const value = curr.split(' ')[1] * 1
  switch (curr) {
    case 'front':
      console.log(acc.length ? acc[0] : -1)
      break
    case 'back':
      console.log(acc.length ? acc[acc.length - 1] : -1)
      break
    case 'size':
      console.log(acc.length)
      break
    case 'empty':
      console.log(Number(acc.length === 0))
      break
    case 'pop':
      console.log(acc.length ? acc[0] : -1)
      acc = acc.slice(1)
      break
    default:
      acc = [...acc, value]
  }
  return acc
}, [])
