const combinationDFS = (visited, arr, index, depth, search, pool, result) => {
  if (depth === search) {
    let temp = ''
    //빈 칸은 '-' 로 만들기
    //pool에는 조합으로 선택된 인덱스만 들어가있음
    let poolIndex = 0
    for (let j = 0; j < arr.length; j++) {
      if (poolIndex < pool.length && j === pool[poolIndex]) {
        temp += arr[j]
        poolIndex++
      } else {
        temp += '-'
      }
    }
    result.push(temp.trim())
    return
  }
  for (let i = index; i < arr.length; i++) {
    if (visited[i]) continue
    visited[i] = true
    pool.push(i)
    combinationDFS(visited, arr, i + 1, depth + 1, search, pool, result)
    pool.pop()
    visited[i] = false
  }
}

const lowerbound = (scoreArr, aScore) => {
  //info는 현재 정렬되어 있음.
  let left = 0
  let right = scoreArr.length - 1
  let lb = 0
  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    if (scoreArr[mid] > aScore) {
      right = mid - 1
    } else if (scoreArr[mid] < aScore) {
      left = mid + 1
      lb = Math.max(lb, left)
    } else {
      right = mid - 1
    }
  }

  return lb
}

function solution(info, query) {
  const answer = []
  const queryMap = {}
  //info마다 조합을 찾아서 객체에 넣기
  info.forEach((userInfo) => {
    const splitted = userInfo.split(' ')
    const score = Number(splitted.pop())
    const visited = new Array(splitted.length).fill(false)
    const pool = []
    const results = []
    //info로 조합할 수 있는 모든 조합 스트링을 찾기
    for (let search = 0; search < 5; search++) {
      combinationDFS(visited, splitted, 0, 0, search, pool, results)
    }
    //객체에 키값을 점수로 해서 넣기
    results.forEach((combi) => {
      combi in queryMap ? queryMap[combi].push(score) : (queryMap[combi] = [score])
    })
  })
  //객체의 모든 value정렬
  Object.keys(queryMap).forEach((key) => queryMap[key].sort((a, b) => a - b))
  //쿼리별로 해당하는 키값배열에 접근해서, 정렬 후, lowerBound
  query.forEach((aQuery) => {
    const [lang, field, exp, temp] = aQuery.split(' and ')
    const [soul, scoreStr] = temp.split(' ')
    const keyQuery = lang + field + exp + soul
    const score = Number(scoreStr)
    if (keyQuery in queryMap) {
      const lb = lowerbound(queryMap[keyQuery], score)
      answer.push(queryMap[keyQuery].length - lb)
    } else {
      answer.push(0)
    }
  })
  return answer
}

console.log(
  solution(
    [
      'java backend junior pizza 150',
      'python frontend senior chicken 210',
      'python frontend senior chicken 150',
      'cpp backend senior pizza 260',
      'java backend junior chicken 80',
      'python backend senior chicken 50',
    ],
    [
      'java and backend and junior and pizza 100',
      'python and frontend and senior and chicken 200',
      'cpp and - and senior and pizza 250',
      '- and backend and senior and - 150',
      '- and - and - and chicken 100',
      '- and - and - and - 150',
    ],
  ),
)
