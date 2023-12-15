const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const START = 100
const target = +input[0]
const TARGET_NUM_LEN = input[0].length
const len = +input[1]

let answer = Infinity

const visited = Array.from({ length: 10 }, () => 0)
const permuArr = []
const pool = []
const permutation = (arr, depth, target) => {
  if (depth === target) {
    permuArr.push(+pool.join(''))
    return
  }
  for (let i = 0; i < 10; i++) {
    if (arr[i] === 0) continue
    visited[i] = 1
    pool.push(i)
    permutation(arr, depth + 1, target)
    visited[i] = 0
    pool.pop()
  }
}

//Case 분류
if (target === START) {
  //목표 채널이 맨 처음 채널일 경우
  answer = 0
} else if (len === 0) {
  //목표 채널이 맨 처음 채널은 아니지만, 모든 리모콘의 버튼을 사용할 수 있는 경우 => 바로 채널에 접근가능.
  //그러나 +-버튼으로 접근하는 것과, 바로 채널딸깍 하는 것의 비용을 고려해야 한다. EX)99를 만들기 위해서는 - 버튼 한 번만 두르면 된다. - 함정 1
  answer = Math.min(TARGET_NUM_LEN, Math.abs(target - START))
} else {
  //뭔가 버튼에 제약사항이 있는 경우

  //사용 가능한 버튼은 1, 사용 불가능한 버튼은 0
  const remoteController = input[2]
    .split(' ')
    .map(Number)
    .reduce(
      (acc, curr) => {
        acc[curr] = 0
        return acc
      },
      Array.from({ length: 10 }, () => 1),
    )

  //만약 주어진 버튼들로 목표 채널을 만들지 못한다면, 가장 가까운 수의 존재는 자리수가 하나 적은 어딘가, 자리수가 같은 어딘가, 자리수가 +1인 어딘가이다.
  for (let i = 1; i <= TARGET_NUM_LEN + 1; i++) {
    permutation(remoteController, 0, i)
  }
  //단순하게 초기 채널에서 +/-로 이동하는 경우의 수
  answer = Math.abs(target - START)
  permuArr.forEach((num) => {
    //각 숫자로부터 목표 채널수를 만드는 데 필요한 버튼 클릭 횟수 = 숫자의 길이 + 채널수와 숫자의 차
    const buttonCount = Math.abs(num - target) + num.toString().length
    if (answer > buttonCount) {
      answer = buttonCount
    }
  })
}

console.log(answer)
