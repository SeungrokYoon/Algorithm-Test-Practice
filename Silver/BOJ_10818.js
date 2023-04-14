const [n, ...arr] = require('fs').readFileSync(0).toString().trim().split('\n')
arr.sort((prev, curr) => {
  const prevAge = prev.split(' ')[0] * 1
  const currAge = curr.split(' ')[0] * 1
  return prevAge - currAge
})

console.log(arr.join('\n'))
