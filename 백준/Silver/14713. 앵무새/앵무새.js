const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const LINES = +input[0]
const parrotsArr = input.slice(1, 1 + LINES).map((l) => l.split(' '))
const WRITTEN_LINE = input[1 + LINES].split(' ')

let notFoundWordExists = false
for (let i = 0; i < WRITTEN_LINE.length; i++) {
  const WRITTEN_WORD = WRITTEN_LINE[i]
  let found = false
  parrotsArr.forEach((wordQueue) => {
    if (wordQueue.length && wordQueue[0] === WRITTEN_WORD && !found) {
      wordQueue.shift()
      found = true
    }
  })
  if (!found) {
    notFoundWordExists = true
    break
  }
}

const needsMoreWordsInWrittenLine =
  parrotsArr.filter((wordQueue) => wordQueue.length > 0).length > 0

const answer = notFoundWordExists || needsMoreWordsInWrittenLine ? 'Impossible' : 'Possible'
console.log(answer)
