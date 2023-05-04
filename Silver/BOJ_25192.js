const input = require('fs').readFileSync(0).toString().trim().split('\n')
const N = input.shift()

let answer = 0
input.reduce((prevSet, id) => {
  if (id === 'ENTER') {
    prevSet.clear()
  } else {
    if (!prevSet.has(id)) {
      prevSet.add(id)
      answer++
    }
  }
  return prevSet
}, new Set())

console.log(answer)
