//S4: https://www.acmicpc.net/problem/1620
const [info, ...pocketmonNames] = require('fs').readFileSync(0).toString().trim().split('\n')
const [N, M] = info.split(' ').map(Number)

const pocketDexByName = new Map()
const pocketDexByIndex = new Map()
pocketmonNames.slice(0, N).forEach((name, index) => {
  pocketDexByName.set(name, index + 1)
  pocketDexByIndex.set(index + 1, name)
})

const answer = pocketmonNames.slice(N).reduce((acc, curr) => {
  if (Number.isInteger(curr * 1)) {
    acc += `${pocketDexByIndex.get(curr * 1)}\n`
  } else {
    acc += `${pocketDexByName.get(curr)}\n`
  }
  return acc
}, '')

console.log(answer)
