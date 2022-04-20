function solution(orders, course) {
  const answer = []
  const combiArr = []
  const courseMap = {}
  course.forEach((course) => {
    courseMap[course] = { max: 0 }
  })

  orders.forEach((order) => {
    //테스트케이스 3에서 보니, 알파벳 순서가 다른 입력도 있었다. 그래서 정렬을 해 주었다. 함정!
    const menus = order.split('').sort()
    let visited = new Array(menus.length).fill(0)
    let pool = []
    const dfs = (index, count, r) => {
      if (count >= r) {
        combiArr.push(pool.join(''))
        return
      }
      for (let i = index; i < menus.length; i++) {
        if (visited[i] === 1) continue
        visited[i] = 1
        pool.push(menus[i])
        dfs(i + 1, count + 1, r)
        visited[i] = 0
        pool.pop()
      }
    }
    for (const c of course) {
      dfs(0, 0, c)
    }
  })
  //각 orders의 order마다 course에 따른 조합을 생성해서 courseMap 에 저장하기
  ///combiArr를 순회하며 courseMap작성
  combiArr.forEach((combi) => {
    const len = combi.length
    Object.keys(courseMap[len]).includes(combi)
      ? (courseMap[len][combi] += 1)
      : (courseMap[len][combi] = 1)
    courseMap[len].max = Math.max(courseMap[len].max, courseMap[len][combi])
  })
  //정렬 후에 조합 개수 세기.2개 이상인 것만 세기 가장 많은 거 return
  for (const c of course) {
    const max = courseMap[c].max
    const keys = Object.keys(courseMap[c])
    for (const key of keys) {
      const selectedCourseNum = courseMap[c][key]
      if (key !== 'max' && selectedCourseNum >= 2 && selectedCourseNum === max) {
        answer.push(key)
      }
    }
  }
  answer.sort()
  return answer
}

solution(['XYZ', 'XWY', 'WXA'], [2, 3, 4])
