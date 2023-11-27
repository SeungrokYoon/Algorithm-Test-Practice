const [A, B] = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

let initialStr = ''
for (let i = 0; i < A.length; i++) {
  initialStr += A[i] + B[i]
}

const dp = [initialStr]
for (let i = 0; i <= 13; i++) {
  const str = dp.pop()
  let nextStr = ''
  for (let j = 1; j < str.length; j++) {
    nextStr += ((parseInt(str[j - 1]) + parseInt(str[j])) % 10).toString()
  }
  dp.push(nextStr)
}

console.log(dp.pop())
