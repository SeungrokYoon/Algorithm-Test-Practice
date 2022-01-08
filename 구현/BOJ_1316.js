const fs = require('fs')
const [n, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split(/\s+/)

const solution = (n, arr) => {
  let answer = 0
  for (let i = 0; i < n; i++) {
    const targetWord = arr[i]
    checkGroup(targetWord) ? (answer += 1) : (answer += 0)
  }
  console.log(answer)
}

const checkGroup = (target) => {
  const hashMap = {}
  let compressedTarget = target[0]
  hashMap[compressedTarget] = 1
  for (let i = 1; i < target.length; i++) {
    const currentCh = target[i]
    if (compressedTarget[compressedTarget.length - 1] === currentCh) continue
    if (Object.keys(hashMap).includes(currentCh)) return false
    hashMap[currentCh] = 1
    compressedTarget += currentCh
  }
  return true
}

solution(n, arr)
