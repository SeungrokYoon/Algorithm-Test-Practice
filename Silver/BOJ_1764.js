//S4: https://www.acmicpc.net/problem/1764
const [info, ...names] = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')
const [N, M] = info.split(' ').map(Number)
const notHeard = new Set()
const notSeen = new Set()

names.forEach((name, index) => {
  if (index < N) {
    notHeard.add(name)
  } else {
    notSeen.add(name)
  }
})

Set.prototype.intersection = function (subset) {
  const intersection = new Set()
  for (const val of subset) {
    if (this.has(val)) {
      intersection.add(val)
    }
  }
  return intersection
}

/* 아래와 같이 프로토타입 함수를 익명함수로 정의하면 this를 찾지 못하니 주의하자. 
Set.prototype.intersection = (subset) => {
  const intersection = new Set()
  for (const val of subset) {
    if (this.has(val)) {
      intersection.add(val)
    }
  }
  return intersection
}
*/

const answer = [...notHeard.intersection(notSeen)].sort()

console.log(answer.length)
console.log(answer.join('\n'))
