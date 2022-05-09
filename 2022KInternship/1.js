function solution(survey, choices) {
  var answer = ''
  const characterMap = { R: 0, T: 0, C: 0, F: 0, J: 0, M: 0, A: 0, N: 0 }
  const characterPair = ['RT', 'CF', 'JM', 'AN']
  const choiceScoreMap = { 1: 3, 2: 2, 3: 1, 4: 0, 5: 1, 6: 2, 7: 3 }
  survey.forEach((eachSurvey, i) => {
    const [pro, con] = eachSurvey.split('')
    const answer = choices[i]
    const character = answer < 5 ? pro : con
    const point = choiceScoreMap[answer]
    characterMap[character] += point
  })
  characterPair.forEach((pair) => {
    const [first, second] = pair.split('')
    answer += characterMap[first] >= characterMap[second] ? first : second
  })
  return answer
}
