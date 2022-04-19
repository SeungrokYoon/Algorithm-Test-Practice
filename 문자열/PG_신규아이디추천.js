function solution(new_id) {
  let answer = new_id
  answer = answer
    .toLowerCase()
    .replace(/[^a-z-_.0-9]/g, '')
    .replace(/[.]{2,}/g, '.')
    .replace(/^[.]|[.]$/g, '')
  if (answer.length === 0) {
    answer += 'a'
  }
  answer = answer.slice(0, 15).replace(/[.]$/g, '')
  if (answer.length <= 2) {
    while (answer.length < 3) {
      answer += answer[answer.length - 1]
    }
  }
  return answer
}

console.log(solution('...!@BaT#*..y.abcdefghijklm'))
