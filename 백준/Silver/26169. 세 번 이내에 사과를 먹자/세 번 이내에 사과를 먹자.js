const map = require('fs')
  .readFileSync(process.platform == 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')
  .map((l) => l.split(' ').map(Number))

const [startR, startC] = map[5]
map.pop()

const dRow = [0, 1, 0, -1]
const dCol = [1, 0, -1, 0]

let isPossibleToGetMoreThanTwoApplesWithinThreeSteps = false
const dfs = ({ currRow, currCol, currStep, limitStep, applesTakenSofar }) => {
  const isApple = map[currRow][currCol] === 1
  const apple = applesTakenSofar + (isApple ? 1 : 0)
  if (currStep === limitStep) {
    if (apple >= 2) isPossibleToGetMoreThanTwoApplesWithinThreeSteps = true
    return
  }

  for (let i = 0; i < 4; i++) {
    const nextRow = currRow + dRow[i]
    const nextCol = currCol + dCol[i]
    if (
      0 <= nextRow &&
      0 <= nextCol &&
      nextRow < 5 &&
      nextCol < 5 &&
      map[nextRow][nextCol] !== -1 &&
      !isPossibleToGetMoreThanTwoApplesWithinThreeSteps //아직 2개 이상의 사과를 찾지 못했으면
    ) {
      map[currRow][currCol] = -1
      dfs({
        currRow: nextRow,
        currCol: nextCol,
        currStep: currStep + 1,
        limitStep,
        applesTakenSofar: apple,
      })
      map[currRow][currCol] = isApple ? 1 : 0
    }
  }
}

dfs({
  currRow: startR,
  currCol: startC,
  currStep: 0,
  limitStep: 3,
  applesTakenSofar: map[startR][startC] === 1 ? 1 : 0,
})

console.log(isPossibleToGetMoreThanTwoApplesWithinThreeSteps ? 1 : 0)
