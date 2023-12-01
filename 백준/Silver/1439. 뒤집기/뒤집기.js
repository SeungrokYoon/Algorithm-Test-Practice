const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()

let zeroCluster = 0
let oneCluster = 0
let prev = input[0]
for (let i = 1; i < input.length; i++) {
  if (input[i] === prev) continue
  prev === '1' ? oneCluster++ : zeroCluster++
  prev = input[i]
}

input[input.length - 1] === '1' && oneCluster++
input[input.length - 1] === '0' && zeroCluster++

console.log(Math.min(zeroCluster, oneCluster))
