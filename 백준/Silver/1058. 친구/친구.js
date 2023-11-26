const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const N = +input[0]
const FRIEND_SIGN = 'Y'
const adjMatrix = input
  .slice(1)
  .map((s) => s.split('').map((isFriend) => (isFriend === FRIEND_SIGN ? 1 : 0)))

const twoFriends = Array.from({ length: N }, () => 0)
for (let start = 0; start < N; start++) {
  for (let target = 0; target < N; target++) {
    if (start === target) continue
    if (adjMatrix[start][target]) {
      twoFriends[start]++
      twoFriends[target]++
      continue
    }
    for (let mediate = 0; mediate < N; mediate++) {
      if (start === mediate || target === mediate) continue
      if (adjMatrix[start][mediate] && adjMatrix[mediate][target]) {
        twoFriends[start]++
        twoFriends[target]++
        break
      }
    }
  }
}

console.log(Math.max(...twoFriends) / 2)
