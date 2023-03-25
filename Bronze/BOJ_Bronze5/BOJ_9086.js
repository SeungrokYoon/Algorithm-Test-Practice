const input = require('fs').readFileSync('dev/stdin').toString().trim().split('\n')
input.forEach((word, index) => {
  if (index === 0) return
  console.log(`${word[0]}${word[word.length - 1]}`)
})
