const input = require('fs').readFileSync('dev/stdin').toString().trim().split('\n')
input.shift()

function recursion(str, l, r) {
  if (l >= r) return [1, 1]
  else if (str[l] !== str[r]) return [0, 1]
  else {
    const subResult = recursion(str, l + 1, r - 1)
    return [subResult[0], subResult[1] + 1]
  }
}

function isPalindrom(str) {
  return recursion(str, 0, str.length - 1).join(' ')
}

input.forEach((str) => console.log(isPalindrom(str)))
