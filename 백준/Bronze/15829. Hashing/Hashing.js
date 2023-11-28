const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')
const N = +input[0]
const str = input[1].toLowerCase()

const hashFunction = (str) => {
  const r = 31
  const M = 1234567891
  let s = 0
  for (let i = 0; i < str.length; i++) {
    s += (str.charCodeAt(i) - 96) * r ** i
  }
  return s % M
}

console.log(hashFunction(str))
