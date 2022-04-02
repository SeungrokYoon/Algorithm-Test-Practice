const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const N = input[0] * 1
const S = input[1]
const memo = { W: 0, WH: 0, WHE: 0, WHEE: 0 }
for (let i = 0; i < N; i++) {
  const currentChar = S[i]
  switch (currentChar) {
    case 'W':
      memo['W'] += 1
      break
    case 'H':
      memo['WH'] = BigInt(`${BigInt(memo['WH']) + BigInt(memo['W'])}`) % 1000000007n
      break
    case 'E':
      memo['WHEE'] = BigInt(`${BigInt(memo['WHEE']) + BigInt(memo['WHEE'])}`) % 1000000007n
      memo['WHEE'] = BigInt(`${BigInt(memo['WHEE']) + BigInt(memo['WHE'])}`) % 1000000007n
      memo['WHE'] = BigInt(`${BigInt(memo['WHE']) + BigInt(memo['WH'])}`) % 1000000007n
      break
    default:
      ''
  }
}
const answer = BigInt(memo['WHEE'])
console.log(`${answer % 1000000007n}`)
