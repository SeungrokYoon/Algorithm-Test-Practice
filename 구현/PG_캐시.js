function solution(cacheSize, cities) {
  if (cacheSize === 0) return 5 * cities.length
  var answer = 0
  let cache = []
  const cacheSet = new Set()
  cities.forEach((city) => {
    const lowered = city.toLowerCase()
    if (cacheSet.has(lowered)) {
      const i = cache.indexOf(lowered)
      //cacheHit 경우에는 히트한 녀석을 가장 최신으로 올려준다.
      cache.splice(i, 1)
      cache.push(lowered)
      answer += 1
    } else {
      answer += 5
      if (cache.length < cacheSize) {
        //삭제없이 더 넣을 수 있음
        cache.push(lowered)
      } else {
        const deleted = cache.shift()
        cacheSet.delete(deleted)
        cache.push(lowered)
      }
      cacheSet.add(lowered)
    }
  })
  return answer
}
