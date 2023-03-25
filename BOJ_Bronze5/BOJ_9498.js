const inputScore = require('fs').readFileSync('/dev/stdin').toString().trim() * 1

if (inputScore >= 90 && inputScore <= 100) {
  console.log('A')
} else if (inputScore >= 80 && inputScore < 90) {
  console.log('B')
} else if (inputScore >= 70 && inputScore < 80) {
  console.log('C')
} else if (inputScore >= 60 && inputScore < 70) {
  console.log('D')
} else {
  console.log('F')
}
