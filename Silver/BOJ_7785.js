const [n, ...inputArr] = require('fs').readFileSync(0).toString().trim().split('\n')

const employeesSet = new Set()
inputArr.forEach((s) => {
  const [name, move] = s.split(' ')
  move === 'enter' ? employeesSet.add(name) : employeesSet.delete(name)
})

const answer = Array.from(employeesSet).sort().reverse().join('\n')
console.log(answer)
