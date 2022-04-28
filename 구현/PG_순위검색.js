const fillUserConditionMap = (info) => {
  const conditionMap = {
    language: { cpp: [], java: [], python: [] },
    field: { frontend: [], backend: [] },
    experience: { junior: [], senior: [] },
    soul: { chicken: [], pizza: [] },
  }
  const allUserObjects = []
  info.forEach((e) => {
    const [userLanguage, userField, userExperience, userSoul, userScore] = e.split(' ')
    const userObject = {
      userLanguage,
      userField,
      userExperience,
      userSoul,
      userScore,
    }
    conditionMap.language[userLanguage].push(userObject)
    conditionMap.field[userField].push(userObject)
    conditionMap.experience[userExperience].push(userObject)
    conditionMap.soul[userSoul].push(userObject)
    allUserObjects.push(userObject)
  })

  return [conditionMap, allUserObjects]
}

function solution(info, query) {
  const answer = []
  const sortedInfo = info.sort((a, b) => {
    const aScore = Number(a.split(' ')[4])
    const bScore = Number(b.split(' ')[4])
    return aScore - bScore
  })
  const mapKeys = ['language', 'field', 'experience', 'soul']
  const conditionTypes = ['userLanguage', 'userField', 'userExperience', 'userSoul']
  const [userConditionMap, allUserObjects] = fillUserConditionMap(sortedInfo)
  query.forEach((aQuery) => {
    const conditions = aQuery.replace(/(and)/g, '').replace(/\s+/g, ' ').split(' ')
    const conditionScore = Number(conditions[conditions.length - 1])
    conditions.pop()
    let filteredUsers = [...allUserObjects]
    let conditionCounter = 0
    conditions.forEach((condition, index) => {
      const userConditionType = conditionTypes[index]
      if (condition === '-') return
      //처음 등장하는 조건에서 초기화
      if (filteredUsers.length === 0 && conditionCounter === 0) {
        filteredUsers = userConditionMap[mapKeys[index]][condition]
        conditionCounter++
        return
      }
      filteredUsers = filteredUsers.filter((userInfo) => {
        return userInfo[userConditionType] === condition
      })
      conditionCounter++
    })
    filteredUsers = filteredUsers.filter((userInfo) => Number(userInfo.userScore) >= conditionScore)
    answer.push(filteredUsers.length)
  })
  return answer
}
