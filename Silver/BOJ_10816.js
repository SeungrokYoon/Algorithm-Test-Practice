//S4: https://www.acmicpc.net/problem/10816
const [info, givenCards, targetInfo, targetCards] = require('fs')
  .readFileSync(0)
  .toString()
  .trim()
  .split('\n')

const cardMap = givenCards
  .split(' ')
  .map(Number)
  .reduce((acc, curr) => {
    acc[curr] ? (acc[curr] += 1) : (acc[curr] = 1)
    return acc
  }, {})

const answer = targetCards
  .split(' ')
  .map(Number)
  .reduce((acc, curr) => {
    cardMap[curr] ? acc.push(cardMap[curr]) : acc.push(0)
    return acc
  }, [])
  .join(' ')

console.log(answer)
