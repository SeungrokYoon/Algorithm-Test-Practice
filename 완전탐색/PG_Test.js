//프로그래머스 - 모의고사
function solution(answers) {
  const answer = []
  const first = [1, 2, 3, 4, 5]
  const second = [2, 1, 2, 3, 2, 4, 2, 5]
  const third = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5]
  const score = [0, 0, 0, 0]
  let i = 0
  while (i < answers.length) {
    if (answers[i] === first[i % first.length]) score[1]++
    if (answers[i] === second[i % second.length]) score[2]++
    if (answers[i] === third[i % third.length]) score[3]++
    i++
  }
  const largest = Math.max(...score)

  i = 0
  while (i < score.length) {
    if (score[i] === largest) answer.push(i)
    i++
  }
  return answer
}
