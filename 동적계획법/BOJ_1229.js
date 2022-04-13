const N =
  require('fs')
    .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
    .toString()
    .trim() * 1

const generateHexaNum = (sizeOfEdge, hList) => {
  const hexaNum = sizeOfEdge * 6 - 6 + hList[sizeOfEdge - 1] - ((sizeOfEdge - 1) * 2 - 1)
  return hexaNum
}
//N 전까지의 육각수 h_n먼저 구하기
const hList = [0, 1, 6]
const dp = Array.from({ length: N + 1 }, () => 1000000)
let isStop = false
let hEdge = 3
while (!isStop) {
  //육각수개수는
  const hexaNum = generateHexaNum(hEdge, hList)
  if (hexaNum > N) {
    isStop = true
    continue
  }
  hList.push(hexaNum)
  hEdge++
}

//구한 육각수들은 다 육각수 하나로 만들 수 있는 숫자들이다
for (let i = 1; i < hList.length; i++) {
  dp[hList[i]] = 1
}

hList.shift()

//dp를 채워넣자.
for (let n = 2; n <= N; n++) {
  let copiedNum = n
  let pointer = hList.length - 1
  //가장 큰 육각수 찾기
  while (copiedNum < hList[pointer]) {
    pointer--
  }
  for (let i = 0; i < pointer + 1; i++) {
    dp[n] = Math.min(dp[n - hList[i]] + 1, dp[n])
  }
}

console.log(dp[N])
