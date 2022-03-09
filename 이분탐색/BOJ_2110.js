const input = require('fs')
  .readFileSync(__dirname + '/test.txt')
  .toString()
  .trim()
  .split('\n')

const [N, C] = input.shift().split(' ').map(Number)
const arr = input.map(Number).sort((a,b)=>a-b)
//'가장 인접한 공유기 사이의 거리'를 이분탐색해보기
const solution = (N,C,arr) =>{
  let minDist = 1
  let maxDist = arr[arr.length-1] - arr[0]
  let upperBound = 0
  while(minDist <= maxDist){
    const mid = Math.floor((minDist+maxDist)/2)
    let nOfWifi = 1
    let prevHouse = arr[0]
    for(let i =1;i<N;i++){
      const currentHouse = arr[i]
      if(currentHouse-prevHouse >= mid){
        nOfWifi++
        prevHouse = currentHouse
      }
    }
    if(nOfWifi>=C){
      //최소 거리를 좀 더 높여서 조사해봐도 된다는 뜻.
      minDist = mid + 1 
      upperBound = Math.max(upperBound, mid)
      continue
    }
    maxDist = mid - 1
  }
  return upperBound
}

console.log(solution(N,C,arr))
