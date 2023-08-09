const directory = process.platform === 'linux' ? 0 : __dirname + '/test.txt'
const input = require('fs').readFileSync(directory).toString().trim().split('\n')
const N = input[0] * 1

const dpTable = Array.from({ length: N + 1 }, () => Array.from({ length: 3 }, () => 0))

for (let i = 1; i < N + 1; i++) {
  const [R, G, B] = input[i].split(' ').map(Number)
  const [prevAccR, prevAccG, prevAccB] = dpTable[i - 1]
  dpTable[i][0] = R + Math.min(prevAccG, prevAccB)
  dpTable[i][1] = G + Math.min(prevAccR, prevAccB)
  dpTable[i][2] = B + Math.min(prevAccR, prevAccG)
}

console.log(Math.min(...dpTable[N]))
