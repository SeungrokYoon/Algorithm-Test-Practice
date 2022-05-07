const hasBonus = (command) => {
  if ((command[command.length - 1] === '*') | (command[command.length - 1] === '#')) return true
  return false
}

function solution(dartResult) {
  var answer = 0
  const dartResultList = dartResult.match(/[0-9]+[A-Z]\D*/g)
  let acc = 0
  let prev = 0
  for (const command of dartResultList) {
    let option = 1
    let score = 0
    let scoreType = ''
    let nextScore = 0
    if (hasBonus(command)) {
      score = command.slice(0, command.length - 2)
      scoreType = command[command.length - 2]
      if (command[command.length - 1] === '*') {
        option = 2
      } else if (command[command.length - 1] === '#') {
        option = -1
      }
    } else {
      score = command.slice(0, command.length - 1)
      scoreType = command[command.length - 1]
    }
    if (scoreType === 'S') {
      nextScore = Number(score)
    } else if (scoreType === 'D') {
      nextScore = Number(score) ** 2
    } else {
      nextScore = Number(score) ** 3
    }

    if (option === 2) {
      acc = acc - prev + (prev + nextScore) * option
      prev = nextScore * option
    } else if (option === -1) {
      acc = acc + nextScore * -1
      prev = nextScore * -1
    } else {
      acc += nextScore
      prev = nextScore
    }
  }
  answer = acc
  return answer
}
