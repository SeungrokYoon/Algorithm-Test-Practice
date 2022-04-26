function solution(n, arr1, arr2) {
  var answer = []
  for (let i = 0; i < n; i++) {
    const n1 = arr1[i]
    const n2 = arr2[i]
    const n3 = n1 | n2
    let newStr = ''
    for (let shift = 0; shift < n; shift++) {
      const shifted = n3 & (1 << shift)
      newStr = (shifted ? '#' : ' ') + newStr
    }
    answer.push(newStr)
  }
  return answer
}
