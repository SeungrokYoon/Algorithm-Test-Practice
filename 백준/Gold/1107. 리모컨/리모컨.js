const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const START = 100
const target = +input[0]
const len = +input[1]

let answer = Infinity

//Case 분류
if (target === START) {
  //목표 채널이 맨 처음 채널일 경우
  answer = 0
} else if (len === 0) {
  //목표 채널이 맨 처음 채널은 아니지만, 모든 리모콘의 버튼을 사용할 수 있는 경우 => 바로 채널에 접근가능.
  //그러나 +-버튼으로 접근하는 것과, 바로 채널딸깍 하는 것의 비용을 고려해야 한다. EX)99를 만들기 위해서는 - 버튼 한 번만 두르면 된다. - 함정 1
  answer = Math.min(target.toString().length, Math.abs(target - START))
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
  for (let i = 1; i < target.toString().length + 2; i++) {
    permutation(remoteController, 0, i)
  }
  answer = Math.abs(target - START)
  permuArr.forEach((num) => {
    const buttonCount = Math.abs(num - target) + num.toString().length
    if (answer > buttonCount) {
      answer = buttonCount
    }
  })
}

console.log(answer)
