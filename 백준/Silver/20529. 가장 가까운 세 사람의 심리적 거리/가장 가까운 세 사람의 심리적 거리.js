const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const MBTI_ARR = [
  'ISTJ',
  'ISFJ',
  'INFJ',
  'INTJ',
  'ISTP',
  'ISFP',
  'INFP',
  'INTP',
  'ESTP',
  'ESFP',
  'ENFP',
  'ENTP',
  'ESTJ',
  'ESFJ',
  'ENFJ',
  'ENTJ',
]

const combi = (arr, depth, target, pool, answer) => {
  if (depth === target) {
    answer.push([...pool])
    return
  }
  for (let i = 0; i < arr.length; i++) {
    pool.push(arr[i])
    combi(arr, depth + 1, target, pool, answer)
    pool.pop()
  }
  return answer
}

/**
 * N의 크기가 너무나도 크기에, 입력된 N으로 바로 조합을 사용하기에는 무리가 있음
그래서 한정된 MBTI 조합을 만들고, 이 조합을 주어진 사람들로 만들 수 있는지 판단하는 전략을 세우고 이를 구현하였다.
*/

const combiThree = combi(MBTI_ARR, 0, 3, [], [])
const calcDistBetween3 = (a, b, c) => {
  let dist = 0
  for (let i = 0; i < 4; i++) {
    if (a[i] !== b[i]) dist++
    if (b[i] !== c[i]) dist++
    if (a[i] !== c[i]) dist++
  }
  return dist
}

const answer = []

for (let i = 1; i < input.length; i += 2) {
  const N = +input[i]
  const peopleObj = input[i + 1].split(' ').reduce((acc, curr) => {
    acc[curr] ? (acc[curr] += 1) : (acc[curr] = 1)
    return acc
  }, {})
  let minDist = 12
  combiThree.forEach(([a, b, c]) => {
    //해당 조합이 peopleObj에서 가능한 조합인지 판단하고, minDist를 갱신해나감
    if (!(peopleObj[a] && peopleObj[b] && peopleObj[c])) return
    if (a === b && b === c) {
      if (peopleObj[a] >= 3) {
        minDist = 0
      }
    } else if (a === b) {
      if (peopleObj[a] >= 2) {
        minDist = Math.min(minDist, calcDistBetween3(a, b, c))
      }
    } else if (b === c) {
      if (peopleObj[b] >= 2) {
        minDist = Math.min(minDist, calcDistBetween3(a, b, c))
      }
    } else if (a === c) {
      if (peopleObj[a] >= 2) {
        minDist = Math.min(minDist, calcDistBetween3(a, b, c))
      }
    } else {
      minDist = Math.min(minDist, calcDistBetween3(a, b, c))
    }
  })
  answer.push(minDist)
}

console.log(answer.join('\n'))
