function solution(N, stages) {
  var answer = []
  const challengeMap = {}
  for (const stage of stages) {
    stage in challengeMap ? (challengeMap[stage] += 1) : (challengeMap[stage] = 1)
  }
  let accumulation = stages.length
  for (let stage = 1; stage < N + 1; stage++) {
    if (stage in challengeMap) {
      answer.push([stage, challengeMap[stage] / accumulation])
      accumulation -= challengeMap[stage]
    } else {
      answer.push([stage, 0])
    }
  }
  answer = answer.sort((a, b) => b[1] - a[1] || a[0] - b[0]).map((e) => e[0])
  return answer
}
