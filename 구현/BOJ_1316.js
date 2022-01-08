const fs = require('fs')
const [n, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split(/\s+/)
// 직접 예시를 만들어 테스트 해 보고자 한다면, 디렉토리에 input.txt 테스트 입력 파일 생성 후, 아래 주석의 코드를 활용하면 됩니다!
// const [n, ...arr] = fs
//   .readFileSync(__dirname + '/input.txt', { encoding: 'utf8', flag: 'r' })
//   .toString()
//   .trim()
//   .split(/\s+/)

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
  for (let i = 1; i < target.length; i++) {
    const currentCh = target[i]
    if (compressedTarget[compressedTarget.length - 1] === currentCh) continue
    compressedTarget += currentCh
  }
  for (let ch of compressedTarget) {
    //Set 자료구조를 사용해도 될 듯?
    if (Object.keys(hashMap).includes(ch)) {
      return false
    } else {
      hashMap[ch] = 1
    }
  }
  return true
}

solution(n, arr)
