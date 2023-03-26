const inputStr = require('fs').readFileSync(0).toString().trim()

const isPalendrom = new Array(inputStr.length).fill().reduce((prevBoolean, currValue, index) => {
  if (!prevBoolean || inputStr[index] !== inputStr[inputStr.length - 1 - index]) return false
  return true
}, true)

console.log(isPalendrom ? 1 : 0)
