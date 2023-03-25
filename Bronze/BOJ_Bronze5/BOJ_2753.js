const inputYear = require('fs').readFileSync('/dev/stdin').toString().trim() * 1

function isLeapYear(year) {
  const condition_1 = year % 4 === 0 && year % 100 !== 0
  const condition_2 = year % 400 === 0
  return condition_1 || condition_2
}

console.log(isLeapYear(inputYear) ? 1 : 0)
