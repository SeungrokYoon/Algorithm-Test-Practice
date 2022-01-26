const input = require('fs')
  .readFileSync(__dirname + '/test.txt')
  .toString()
  .trim()
  .split('\n')

const N = input.shift()
const arr = input.map((s) => s.replaceAll('ng', 'nz').replaceAll('k', 'c'))
arr.sort()
arr
  .map((s) => s.replaceAll('nz', 'ng').replaceAll('c', 'k'))
  .forEach((s) => {
    console.log(s)
  })
