//S3: 영단어 암기는 괴로워 https://www.acmicpc.net/problem/20920

const targetDirectory = process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt'
const input = require('fs').readFileSync(targetDirectory).toString().trim().split('\n')
const [N, M] = input.shift().split(' ').map(Number)

const dic = input.reduce((acc, word) => {
  if (word.length < M) return acc
  acc[word] ? acc[word]++ : (acc[word] = 1)
  return acc
}, {})

//a.localeCompare(b) 의 리턴값은 a가 우선할경우 음수, 뒤에올경우 양수, 같으면 0

const dicArr = Object.entries(dic).sort((a, b) => {
  const [aKey, aValue] = a
  const [bKey, bValue] = b
  const byOccurence = bValue - aValue
  const byLength = bKey.length - aKey.length
  const byLocaleCompare = aKey.localeCompare(bKey) //사전상으로 앞에 있는 단어가 앞에 와야 하니까, aKey가 bKey보다 우선하는 경우에는 교체하지 않는다.(음수)
  return byOccurence || byLength || byLocaleCompare
})

const answer = dicArr.map((entry) => entry[0]).join('\n')

console.log(answer)
