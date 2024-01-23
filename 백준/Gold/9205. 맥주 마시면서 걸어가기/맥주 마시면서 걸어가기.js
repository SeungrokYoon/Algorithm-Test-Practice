const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const answer = []

for (let i = 1; i < input.length; i++) {
  const STORES = +input[i]
  const [homeX, homeY] = input[i + 1].split(' ').map(Number)
  const storesArr = input.slice(i + 2, i + 2 + STORES).map((l) => [...l.split(' ').map(Number), 0]) //0 for visited
  const [festivalX, festivalY] = input[i + 2 + STORES].split(' ').map(Number)
  let found = false
  const queue = [[homeX, homeY, 1000]]
  while (queue.length) {
    const [x, y, restBeer] = queue.shift()
    if (Math.abs(x - festivalX) + Math.abs(y - festivalY) <= restBeer) {
      answer.push('happy')
      found = true
      break
    }
    for (let i = 0; i < storesArr.length; i++) {
      const [storeX, storeY, visited] = storesArr[i]
      if (Math.abs(storeX - x) + Math.abs(storeY - y) <= restBeer && !visited) {
        storesArr[i][2] = 1
        queue.push([storeX, storeY, 1000])
      }
    }
  }
  !found ? answer.push('sad') : ''
  i += STORES + 2
}
console.log(answer.join('\n'))
