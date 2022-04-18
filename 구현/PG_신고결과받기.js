function solution(id_list, report, k) {
  const answer = []
  const mails = {}
  const users = {}
  const userMap = {}
  id_list.forEach((id) => {
    users[id] = 0
    mails[id] = 0
    userMap[id] = {}
  })
  report.forEach((aReport) => {
    const [from, to] = aReport.split(' ')
    userMap[from][to] ? (userMap[from][to] = 1) : (userMap[from][to] = 1)
  })
  for (const id of id_list) {
    for (const reported of Object.keys(userMap[id])) {
      users[reported]++
    }
  }
  for (const id of id_list) {
    for (const reported of Object.keys(userMap[id])) {
      if (users[reported] >= k) {
        mails[id]++
      }
    }
  }
  id_list.forEach((id) => {
    answer.push(mails[id])
  })
  return answer
}
