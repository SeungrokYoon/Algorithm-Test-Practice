const input = require('fs')
  .readFileSync(process.platform == 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const N = +input[0]
let idx = 1
const answer = []
while (idx < input.length) {
  const l = +input[idx]
  let cardStr = ''
  const queue = input[idx + 1].split(' ').reverse()
  while (queue.length) {
    const char = queue.pop()
    if (cardStr.length === 0) {
      cardStr += char
    } else {
      cardStr[0] >= char ? (cardStr = char + cardStr) : (cardStr = cardStr + char)
    }
  }
  answer.push(cardStr)
  idx += 2
}

console.log(answer.join('\n'))
