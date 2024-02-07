const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

input.shift()

const medalMap = input.reduce((map, curr) => {
  const [countryNum] = curr.split(' ')
  !map.has(countryNum) ? map.set(countryNum, 0) : ''
  return map
}, new Map())

const answer = []
input
  .map((l) => l.split(' '))
  .sort((a, b) => Number(b[2]) - Number(a[2]))
  .forEach(([country, student]) => {
    if (medalMap.get(country) < 2) {
      answer.push([country, student].join(' '))
      medalMap.set(country, medalMap.get(country) + 1)
    }
  })

console.log(answer.slice(0, 3).join('\n'))
