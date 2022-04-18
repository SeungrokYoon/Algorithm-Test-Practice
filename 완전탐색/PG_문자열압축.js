function solution(s) {
  let answer = s.length
  for (let sliceSize = 1; sliceSize <= Math.floor(s.length / 2); sliceSize++) {
    let tempStr = ''
    let sliced = s.slice(0, sliceSize)
    let index = sliceSize
    let counter = 1
    while (index < s.length) {
      let current = s.slice(index, index + sliceSize)
      if (sliced === current) {
        counter++
      } else {
        tempStr += counter === 1 ? sliced : `${counter}${sliced}`
        sliced = current
        counter = 1
      }
      index += sliceSize
    }
    tempStr += counter === 1 ? sliced : `${counter}${sliced}`
    answer = Math.min(answer, tempStr.length)
  }

  return answer
}

console.log(solution('aabbaccc'))
console.log(solution('ababcdcdababcdcd'))
console.log(solution('abcabcdede'))
console.log(solution('abcabcabcabcdededededede'))
console.log(solution('xababcdcdababcdcd'))
