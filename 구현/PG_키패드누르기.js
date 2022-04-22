function solution(numbers, hand) {
  var answer = ''
  let currentLeft = [3, 0]
  let currentRight = [3, 2]
  const phoneMap = {
    1: [0, 0],
    2: [0, 1],
    3: [0, 2],
    4: [1, 0],
    5: [1, 1],
    6: [1, 2],
    7: [2, 0],
    8: [2, 1],
    9: [2, 2],
    0: [3, 1],
  }
  for (const num of numbers) {
    if ([1, 4, 7].includes(num)) {
      answer += 'L'
      currentLeft = phoneMap[num]
    } else if ([3, 6, 9].includes(num)) {
      answer += 'R'
      currentRight = phoneMap[num]
    } else {
      const [x, y] = phoneMap[num]
      const distFromLeft = Math.abs(x - currentLeft[0]) + Math.abs(y - currentLeft[1])
      const distFromRight = Math.abs(x - currentRight[0]) + Math.abs(y - currentRight[1])
      if (distFromLeft > distFromRight) {
        currentRight = [x, y]
        answer += 'R'
      } else if (distFromLeft < distFromRight) {
        currentLeft = [x, y]
        answer += 'L'
      } else {
        if (hand === 'right') {
          currentRight = [x, y]
          answer += 'R'
        } else {
          currentLeft = [x, y]
          answer += 'L'
        }
      }
    }
  }

  return answer
}
