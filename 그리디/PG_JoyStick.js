//https://programmers.co.kr/learn/courses/30/lessons/42860
function solution(name) {
  let isAExistsOnLeftOrRight = 0
  const arr = name
    .split('')
    .map((ch) => ch.charCodeAt(0) - 65)
    .map((chCode) => Math.min(chCode, 26 - chCode))
  console.log(arr)
  const answer = arr.reduce((prev, curr, index) => {
    if (arr.length >= 2 && (index === 1 || index === name.length - 1) && curr === 0)
      isAExistsOnLeftOrRight = 1
    return prev + curr
  }, 0)

  return isAExistsOnLeftOrRight ? answer - 1 + name.length - 1 : answer + name.length - 1
}
