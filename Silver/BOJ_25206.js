const input = require('fs').readFileSync(0).toString().trim().split('\n')

const info = { totalGrade: 0, totalTime: 0 }

const convertGrade2Score = (grade) => {
  const gradeMap = {
    'A+': 4.5,
    A0: 4.0,
    'B+': 3.5,
    B0: 3.0,
    'C+': 2.5,
    C0: 2.0,
    'D+': 1.5,
    D0: 1.0,
    F: 0.0,
  }
  return gradeMap[grade] || 0
}

input.reduce((acc, line) => {
  const [subject, time, grade] = line.split(' ')
  if (grade === 'P') return acc
  acc.totalGrade += time * 1 * convertGrade2Score(grade)
  acc.totalTime += time * 1
  return acc
}, info)

const answer = info.totalGrade / info.totalTime
console.log(answer)
