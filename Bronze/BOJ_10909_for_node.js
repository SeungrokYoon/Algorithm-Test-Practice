//B1: 수 정렬하기 3

//백준 사이트 Node js의 메모리 제한때문에, 배열이 아니라 Map을 이용해서 풀려고 함
//Step 1: 인풋의 최대값을 지니는 배열을 하나 만들기
const readline = require('readline')
const fs = require('fs')
const instream = fs.createReadStream('test/test.txt')
const reader = readline.createInterface({ input: instream, output: process.stdout })

const accMap = new Map()
let max = 0
let n = 0
reader.on('line', (l) => {
  if (n === 0) {
    n = l
  } else {
    max = Math.max(max, l)
    //Step 2: 해당 숫자 인덱스에 해당하는 값을 올려주기
    if (accMap.has(l)) {
      accMap.set(l, accMap.get(l) + 1)
    } else {
      accMap.set(l, 1)
    }
  }
})

reader.on('close', () => {
  //Step 3: 최대값까지 순차적으로 순회하면서 답을 갱신
  let answer = ''
  for (let i = 1; i <= max; i++) {
    if (accMap.has(i.toString())) answer += `${i}\n`.repeat(accMap.get(i.toString()))
  }
  console.log(answer)
})
