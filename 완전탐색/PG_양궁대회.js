const binaryDFS = (index, n, result, pool) => {
  if (index === n) {
    result.push([...pool])
    return
  }
  //선택하고
  binaryDFS(index + 1, n, result, [...pool, 1])
  //선택하지않고
  binaryDFS(index + 1, n, result, [...pool, 0])
}

function solution(n, info) {
  let answer = []
  const totalScore = info.reduce((acc, curr, i) => acc + (curr > 0 ? 10 - i : 0), 0)
  let lionScore = 0
  const combinations = []
  binaryDFS(0, 11, combinations, [])
  let maxDiff = 0
  combinations.forEach((combLion) => {
    //1인 점수는 라이언이 가져가야 할 점수. 가져갈 점수를 위해서 몇 개의 활이 필요한지 계산하고, 만약 점수차가 가장 큰 조합이라면 추가.
    let lionScore = 0
    let arrows = 0
    let apeachScore = totalScore
    const arrowsArr = []
    combLion.forEach((hit, i) => {
      if (!hit) {
        arrowsArr.push(0)
        return
      }
      const score = 10 - i
      let hitCost = info[i] + 1
      if (i === 10) {
        //10을 맞춘 경우에,만약 더 사용할 수 있는 화살이 남아있으면, 소진해주기
        if (n - arrows > 0) {
          hitCost = n - arrows
        }
      }
      arrows += hitCost
      lionScore += score
      apeachScore = info[i] > 0 ? apeachScore - score : apeachScore
      arrowsArr.push(hitCost)
    })
    if (arrows === n && lionScore > apeachScore && lionScore - apeachScore >= maxDiff) {
      answer.push({ diff: lionScore - apeachScore, arr: arrowsArr })
      maxDiff = Math.max(lionScore - apeachScore, maxDiff)
    }
  })
  answer = answer.filter((e) => e.diff === maxDiff).map((e) => e.arr)
  //작은 활을 더 많이 맞춘 쪽으로 정렬
  answer.sort((a, b) => {
    for (let i = 10; i >= 0; i--) {
      if (b[i] - a[i] === 0) {
        continue
      }
      if (b[i] - a[i] > 0) {
        return 1
      }
      return -1
    }
  })
  return answer.length ? answer[0] : [-1]
}
