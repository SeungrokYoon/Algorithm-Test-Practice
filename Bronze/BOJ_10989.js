//B1: 수 정렬하기 3

/** 1차 풀이
 * 문제점: 메모리 초과
 */
// const [N, ...arr] = require('fs').readFileSync(0).toString().trim().split('\n').map(Number)
// console.log(arr.sort((a, b) => a - b).join('\n'))

/** 2차 풀이
 * 문제점: 메모리 초과
 * 해법: 카운트 정렬 구현
 */

//Step 1: 인풋의 최대값을 지니는 배열을 하나 만들기
const [N, ...arr] = require('fs').readFileSync(0).toString().trim().split('\n').map(Number)
const max = arr.reduce((prev, curr) => Math.max(prev, curr), 0)
const accArr = new Array(max + 1).fill(0)
const answerArr = new Array(max + 1).fill(0)

//Step 2: 해당 숫자 인덱스에 해당하는 값을 올려주기
arr.forEach((n) => {
  accArr[n]++
})

//Step 3: 누적합 배열을 만들기
for (let i = 1; i < max + 1; i++) {
  accArr[i] += accArr[i - 1]
}

//정석 Step 4: 원래 주어진 배열을 거꾸로 순회하면서, accArr을 채워나가기. 채우면서는 accArr 갱신하기
for (let i = arr.length - 1; i >= 0; i--) {
  const val = arr[i]
  const position = accArr[val]
  answerArr[position] = val
  accArr[val]--
}

const answer = answerArr.reduce((acc, curr) => (curr !== 0 ? acc + curr + '\n' : acc), '')
console.log(answer)
