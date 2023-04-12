//S4: 알고리즘 수업 - 점근적 표기 1
const inputArr = require('fs').readFileSync(0).toString().trim().split('\n')
const [a1, a0] = inputArr[0].split(' ').map(Number)
const c = inputArr[1] * 1
const n0 = inputArr[2] * 1

function fulfillBigONotation(a1, a0, c, n0) {
  if (a1 === c) {
    return 1 //since c is always positive according to the given condition
  } else {
    //계산
    const meetingPoint = a0 / (c - a1)
    if (meetingPoint < n0) {
      const v1 = a1 * n0 + a0
      const v2 = c * n0
      return v2 - v1 >= 0 ? 1 : 0
    } else if (meetingPoint === n0) {
      const v1 = a1 * (n0 + 1) + a0
      const v2 = c * (n0 + 1)
      return v2 - v1 >= 0 ? 1 : 0
    } else {
      return 0 //someday 2 lines will cross over
    }
  }
}

console.log(fulfillBigONotation(a1, a0, c, n0))
