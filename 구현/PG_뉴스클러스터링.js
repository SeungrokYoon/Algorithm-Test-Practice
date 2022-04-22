function solution(str1, str2) {
  var answer = 0
  str1 = str1.toLowerCase()
  str2 = str2.toLowerCase()
  const A = {}
  const B = {}
  const keyMap = {}
  for (let i = 0; i < str1.length - 1; i++) {
    const substr = str1.slice(i, i + 2)
    if (substr.match(/[^a-z]/g)) continue
    Object.keys(keyMap).includes(substr)
      ? (keyMap[substr].A += 1)
      : (keyMap[substr] = { A: 1, B: 0 })
  }
  for (let i = 0; i < str2.length - 1; i++) {
    const substr = str2.slice(i, i + 2)
    if (substr.match(/[^a-z]/g)) continue
    Object.keys(keyMap).includes(substr)
      ? (keyMap[substr].B += 1)
      : (keyMap[substr] = { A: 0, B: 1 })
  }
  const keys = Object.keys(keyMap)
  let intersection = 0
  let union = 0
  if (keys.length === 0) return 65536
  keys.forEach((key) => {
    intersection += Math.min(keyMap[key].A, keyMap[key].B)
    union += Math.max(keyMap[key].A, keyMap[key].B)
  })
  answer = Math.floor((intersection * 65536) / union)
  return answer
}
