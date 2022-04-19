function solution(record) {
  const result = []
  const userMap = new Map()
  for (const log of record) {
    const splitted = log.split(' ')
    switch (splitted[0]) {
      case 'Enter':
        userMap.set(splitted[1], splitted[2])
        break
      case 'Leave':
        break
      case 'Change':
        userMap.set(splitted[1], splitted[2])
        break
      default:
        break
    }
  }
  //최종 userMap 에서 이제 userId 로 찾아서 결과를 출력하기
  record.forEach((log) => {
    const splitted = log.split(' ')
    switch (log.split(' ')[0]) {
      case 'Enter':
        result.push(`${userMap.get(splitted[1])}님이 들어왔습니다.`)
        break
      case 'Leave':
        result.push(`${userMap.get(splitted[1])}님이 나갔습니다.`)
        break
      default:
        break
    }
  })
  return result
}
