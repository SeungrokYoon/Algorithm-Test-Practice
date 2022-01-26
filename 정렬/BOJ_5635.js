const input = require('fs')
  .readFileSync(__dirname + '/test.txt')
  .toString()
  .trim()
  .split('\n')

const N = 1 * input.shift()
const arr = input
  .map((str) => {
    const splitted = str.split(' ')
    return [
      splitted.slice(0, 1)[0],
      splitted
        .slice(1)
        .reverse()
        .map((num, index) => num * 10 ** (6 - 2 * index))
        .reduce((a, b) => a + b, 0),
    ]
  })
  .sort((a, b) => a[1] - b[1])
console.log(arr[arr.length - 1][0])
console.log(arr[0][0])
