const input = require('fs')
  .readFileSync(process.platform == 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const answer = []
const shortcutSet = new Set()
input.slice(1).forEach((str) => {
  answer.push(solution(str))
})

function solution(str) {
  const wordArr = str.split(' ')
  if (wordArr.length === 1) {
    for (let i = 0; i < wordArr[0].length; i++) {
      const keyChar = wordArr[0][i].toLowerCase()
      if (shortcutSet.has(keyChar)) continue
      shortcutSet.add(keyChar)
      return wordArr[0].slice(0, i) + '[' + wordArr[0][i] + ']' + wordArr[0].slice(i + 1)
    }
  } else {
    for (let i = 0; i < wordArr.length; i++) {
      const firstChar = wordArr[i][0].toLowerCase()
      if (shortcutSet.has(firstChar)) continue
      shortcutSet.add(firstChar)
      wordArr[i] = '[' + wordArr[i][0] + ']' + wordArr[i].slice(1)
      return wordArr.join(' ')
    }
    for (let i = 0; i < wordArr.length; i++) {
      for (let j = 0; j < wordArr[i].length; j++) {
        const keyChar = wordArr[i][j].toLowerCase()
        if (shortcutSet.has(keyChar)) continue
        shortcutSet.add(keyChar)
        wordArr[i] = wordArr[i].slice(0, j) + '[' + wordArr[i][j] + ']' + wordArr[i].slice(j + 1)
        return wordArr.join(' ')
      }
    }
  }
  return str
}

console.log(answer.join('\n'))
