function solution(name) {
  const answer = 0
  //상하 움직임 계산
  const charCodeArr = name.split('').map((ch) => {
    const charCode = ch.charCodeAt(0) - 65
    return Math.min(charCode, 26 - charCode)
  })
  const upDown = charCodeArr.reduce((a, b) => a + b, 0)
  //모두A라면 그냥 끝내면 됨
  if (charCodeArr.reduce((a, b) => a + b, 0) === 0) {
    return 0
  }

  //순방향 (우측): 0번 인덱스에서 가장 먼 A가아닌 철자의 인덱스
  let toRight = upDown
  for (let i = name.length - 1; i >= 0; i--) {
    if (charCodeArr[i] !== 0) {
      toRight += i
      break
    }
  }

  //역방향 (좌측): 0번 인덱스에서 우측으로 가장 가까운 A가 아닌 철자의 인덱스까지 역방향 거리
  let toLeft = upDown
  for (let i = 0; i < name.length; i++) {
    if (charCodeArr[i] !== 0) {
      toLeft += name.length - i
      break
    }
  }

  let toRightLeft = name.length - 1
  let toLeftRight = name.length - 1
  //순->역 : 0번 인덱스부터 시작하여 차례대로 가장 작은 순->역 거리를 구한다.
  //역->순 : 0번 인덱스부터 시작하여 차례대로 가장 작은 순->역 거리를 구한다.
  //순->역의 거리 : 인덱스까지의 거리 + 해당 인덱스에서 우측으로 가장 가까운 A가 아닌 철자의 인덱스까지 역방향 거리 = 2 * 인덱스 + 역방향 거리
  //역->순의 거리 : 인덱스까지의 거리 + 최 우측부터 (해당 인덱스에서 우측으로 가장 가까운 A가 아닌 철자의 인덱스) 까지의 거리 * 2 = 인덱스 + 역방향 거리 * 2
  for (let i = 0; i < name.length; i++) {
    //가장 가까운 오른쪽 찾기
    let tempToRightLeft = 0
    let tempToLeftRight = 0
    for (let j = i + 1; j < name.length; j++) {
      if (charCodeArr[j] !== 0) {
        tempToRightLeft += i + name.length - j
        tempToLeftRight += 2 * (name.length - j)
        break
      }
    }
    tempToRightLeft += i
    tempToLeftRight += i
    toRightLeft = Math.min(toRightLeft, tempToRightLeft)
    toLeftRight = Math.min(toLeftRight, tempToLeftRight)
  }
  toRightLeft += upDown
  toLeftRight += upDown

  return Math.min(toRight, toLeft, toRightLeft, toLeftRight)
}
