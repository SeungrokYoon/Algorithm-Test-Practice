function solution(gems) {
  var answer = []
  const gemMap = {}
  const gemSet = new Set()
  gems = [''].concat(gems)

  let discoveredCombi = { start: gems.length, end: gems.length, gemCount: 0 }
  for (let i = 1; i < gems.length; i++) {
    const gem = gems[i]
    //만약에 새로운 보석의 등장이라면 무조건 갱신해줘야함
    const isNewGem = !gemSet.has(gem)
    gemMap[gem] = i
    const temp = []
    Object.keys(gemMap).forEach((gem) => {
      temp.push(gemMap[gem])
    })
    temp.sort((a, b) => a - b)
    const tempDiscoveredCombi = {
      start: temp[0],
      end: temp[temp.length - 1],
      gemCount: discoveredCombi.gemCount,
    }
    if (isNewGem) {
      gemSet.add(gem)
      tempDiscoveredCombi.gemCount++
      discoveredCombi = tempDiscoveredCombi
    } else {
      //새로운 보석은 아님
      discoveredCombi =
        discoveredCombi.end - discoveredCombi.start >
        tempDiscoveredCombi.end - tempDiscoveredCombi.start
          ? tempDiscoveredCombi
          : discoveredCombi
    }
  }
  answer = [discoveredCombi.start, discoveredCombi.end]
  return answer
}
