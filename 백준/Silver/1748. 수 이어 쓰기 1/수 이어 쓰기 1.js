const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()

let totalLen = 0
for (let pointer = 0; pointer < input.length - 1; pointer++) {
  const len = pointer + 1
  totalLen += len * (10 ** len - 10 ** (len - 1))
}

totalLen += (Number(input) - 10 ** (input.length - 1) + 1) * input.length

console.log(totalLen)
