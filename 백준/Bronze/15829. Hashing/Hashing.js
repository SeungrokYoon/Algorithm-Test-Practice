const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')
const N = +input[0]
const str = input[1].toLowerCase()

const rep = (r, i, mod) => {
  let m = 1
  for (let j = 0; j < i; j++) {
    m = (m * r) % mod
  }
  return m
}

const hashFunction = (str) => {
  const r = 31
  const M = 1234567891
  let s = BigInt(0)
  for (let i = 0; i < str.length; i++) {
    s += (BigInt(str.charCodeAt(i) - 96) * BigInt(rep(r, i, M))) % BigInt(M)
  }
  return (s % BigInt(M)).toString()
}

console.log(hashFunction(str))
