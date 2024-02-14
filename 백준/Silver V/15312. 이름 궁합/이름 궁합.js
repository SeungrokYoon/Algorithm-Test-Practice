const [nameA, nameB] = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const getNameString = (nameA, nameB) => {
  if (nameA.length !== nameB.length) throw new Error('Wrong Names!')
  let str = ''
  for (let i = 0; i < nameA.length; i++) {
    str += nameA[i] + nameB[i]
  }
  return str
}

const charCodeA = 65
const strokes = [3, 2, 1, 2, 3, 3, 2, 3, 3, 2, 2, 1, 2, 2, 1, 2, 2, 2, 1, 2, 1, 1, 1, 2, 2, 1]
const nameStr = getNameString(nameA, nameB)
let counter = nameStr.length - 2
let strokeArr = nameStr.split('').map((ch) => strokes[ch.charCodeAt(0) - charCodeA])

while (counter-- > 0) {
  const resCodeArr = []
  for (let i = 0; i + 1 < strokeArr.length; i++) {
    resCodeArr.push((strokeArr[i] + strokeArr[i + 1]) % 10)
  }
  strokeArr = resCodeArr
}

console.log(strokeArr.join(''))
