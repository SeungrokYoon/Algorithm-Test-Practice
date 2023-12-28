const input = require('fs')
  .readFileSync(process.platform == 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const N = +input[0]

const answer = []
for (let i = 1; i < input.length; ) {
  const LINES = +input[i]
  const applicants = input
    .slice(i + 1, i + 1 + LINES)
    .map((l) => l.split(' ').map(Number))
    .sort((a, b) => a[0] - b[0])
  let counter = 1
  let highestScore = applicants[0][1]
  //이미 서류전형점수로 순위가 오름차순으로 정렬되어있다. 특정 idx 이후의 지원자들은 이미 서류전형점수상으로 idx보다 열세이기에 비교할 필요가 없음
  //즉, idx지원자의 서류전형점수가 이후 지원자들의 서류전형점수보다 우위에 있음이 확실해져서 비교의 의미가 없다는 말
  //그래서 서류전형점수상으로 위에 있는 지원자들 중에서 가장 좋은 인터뷰점수를 가지고 있는 지원자와 비교해야함.
  for (let idx = 1; idx < applicants.length; idx++) {
    const hasBetterInterviewScore = highestScore >= applicants[idx][1]
    if (hasBetterInterviewScore) counter++
    highestScore = Math.min(applicants[idx][1], highestScore)
  }
  answer.push(counter)
  i += LINES + 1
}

console.log(answer.join('\n'))
