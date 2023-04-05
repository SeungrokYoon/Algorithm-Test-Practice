const [dimension, ...arr] = require('fs')
  .readFileSync('test/test.txt')
  .toString()
  .trim()
  .split('\n')
const [N, M] = dimension.split(' ').map(Number)

const answer = arr.reduce((acc, line, index) => {
  if (index >= N) return acc
  const currentLine = line.split(' ').map(Number)
  const nextLine = arr[index + N].split(' ').map(Number)
  const newLine = currentLine.reduce((acc, num, index) => {
    acc.push(num + nextLine[index])
    return acc
  }, [])
  acc.push(newLine.join(' '))
  return acc
}, [])

console.log(answer.join('\n'))
