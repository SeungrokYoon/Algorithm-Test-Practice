function solution(gems) {
  const gemMap = new Map()
  const gemSet = new Set(gems)
  gemMap.set(gems[0], 1)
  //start이상부터 end 이하까지 볼 거임
  //투포인터의 개념을 사용하여 O(n)유지하기 O(n^2)은 시간초과가 나옴
  let start = 0,
    end = 1,
    minSize = gems.length + 1,
    minStart = gems.length + 1,
    minEnd = gems.length + 1
  while (start < end) {
    if (gemMap.size !== gemSet.size && end < gems.length) {
      const index = end
      const gem = gems[index]
      const count = gemMap.has(gem) ? gemMap.get(gem) + 1 : 1
      gemMap.set(gem, count)
      end++
    } else {
      if (gemMap.size === gemSet.size) {
        if (minSize > end - start - 1) {
          //-1해주는 이유는 start가 0부터 시작하니까 인덱스를 맞춰주기 위해서
          //최소값이 갱신 가능하다면
          minSize = end - start - 1
          minStart = start + 1 //start는 0부터 시작하니까 인덱스를 맞춰주려고
          minEnd = end
        }
      }
      const gem = gems[start]
      if (gemMap.has(gem)) {
        if (gemMap.get(gem) === 1) {
          gemMap.delete(gem)
        } else {
          gemMap.set(gem, gemMap.get(gem) - 1)
        }
      }

      start++
    }
  }
  return [minStart, minEnd]
}
