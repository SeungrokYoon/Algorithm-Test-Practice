function solution(n, s, a, b, fares) {
  var answer = Infinity
  const adjMap = Array.from({ length: n + 1 }, () => new Map())
  const primTable = Array.from({ length: n + 1 }, () =>
    Array.from({ length: n + 1 }, () => Infinity),
  )

  fares.forEach((fare) => {
    const [from, to, weight] = fare
    primTable[from][to] = weight
    primTable[to][from] = weight
  })

  for (let e = 1; e < n + 1; e++) {
    for (let start = 1; start < n + 1; start++) {
      for (let end = start + 1; end < n + 1; end++) {
        if (e === start || start === end || e === end) continue
        const newNum = Math.min(primTable[start][end], primTable[start][e] + primTable[e][end])
        primTable[start][end] = newNum
        primTable[end][start] = newNum
      }
    }
  }
  for (let together = 1; together < n + 1; together++) {
    let tempFare = 0
    if (together === a) {
      tempFare = primTable[s][a] + primTable[together][b]
    } else if (together === b) {
      tempFare = primTable[s][b] + primTable[together][a]
    } else if (together === s) {
      tempFare = primTable[s][a] + primTable[s][b]
    } else {
      tempFare = primTable[s][together] + primTable[together][a] + primTable[together][b]
    }
    answer = Math.min(tempFare, answer)
  }
  return answer
}
