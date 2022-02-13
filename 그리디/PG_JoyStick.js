//https://programmers.co.kr/learn/courses/30/lessons/42860
function solution(name) {
  let answer = 0
  const result = []
  let start = new Array(name.length).fill('A')

  const chCodeArr = name
    .split('')
    .map((ch) => ch.charCodeAt(0) - 65)
    .map((chCode) => Math.min(chCode, 26 - chCode))

  const findClosestNum = (currentIndex) => {
    //currentIndex로부터 A가 아닌 가장 가까운 문자를 지닌 인덱스 찾기-< A는 지나쳐도 되니까.
    let distance = 1
    let leftIndex = currentIndex
    let rightIndex = currentIndex
    let closestNextIndex = name.length + 1
    while (distance < name.length) {
      leftIndex = (currentIndex - distance + name.length) % name.length
      rightIndex = (currentIndex + distance) % name.length
      if (name[rightIndex] !== start[rightIndex] && name[leftIndex] !== start[leftIndex]) {
        closestNextIndex = rightIndex
        return { closestNextIndex: closestNextIndex, distance: distance }
      } else if (name[rightIndex] === start[rightIndex] && name[leftIndex] !== start[leftIndex]) {
        closestNextIndex = Math.min(leftIndex, closestNextIndex)
        return { closestNextIndex: closestNextIndex, distance: distance }
      } else if (name[rightIndex] !== start[rightIndex] && name[leftIndex] === start[leftIndex]) {
        closestNextIndex = Math.min(rightIndex, closestNextIndex)
        return { closestNextIndex: closestNextIndex, distance: distance }
      } else {
        distance++
      }
    }
    return { closestNextIndex: name.length, distance: name.length }
  }
  for (let nextIndex = 0; nextIndex < name.length; nextIndex++) {
    while (start.join('') !== name) {
      answer += chCodeArr[nextIndex]
      start[nextIndex] = name[nextIndex]
      const next = findClosestNum(nextIndex)
      if (next.closestNextIndex === name.length) return answer
      nextIndex = next.closestNextIndex
      answer += next.distance
    }
    result.push(answer)
    answer = 0
  }
  return result
}

console.log(solution('BAJAAAAAAZ'))
console.log(solution('BBBBAAAAABA'))
