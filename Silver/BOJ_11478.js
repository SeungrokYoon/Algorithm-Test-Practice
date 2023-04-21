//https://www.acmicpc.net/submit/11478

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()

const subStrSet = new Set()
for (let start = 0; start < input.length; start++) {
  for (let len = 1; start + len - 1 < input.length; len++) {
    const subStr = input.slice(start, start + len)
    if (!subStrSet.has(subStr)) subStrSet.add(subStr)
  }
}

console.log(subStrSet.size)
