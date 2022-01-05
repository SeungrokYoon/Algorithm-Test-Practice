//백준 4673 셀프 넘버
//이 문제는 입력이 없는 문제입니다.
const generateNextNum = (num) => {
  const newNum = num + num.toString().split('').map((strNum)=> parseInt(strNum)).reduce((prev, current) => prev + current)
  return newNum 
}

function solution() {
  const arr = new Array(10000).fill(false)
  for (let i = 1; i< arr.length; i++){
    if (arr[i]) continue
    let j = i
    while(j<10000){
      const newNum = generateNextNum(j)
      if (!arr[newNum]) arr[newNum] = true
      j = newNum
    }
  }
  for (let k = 1; k< 10000; k++){
    if (!arr[k]) console.log(k)
  }
}

solution()