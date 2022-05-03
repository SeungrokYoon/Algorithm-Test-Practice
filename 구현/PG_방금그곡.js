function solution(m, musicinfos) {
  var answer = ''
  const results = []
  const mList = m.match(/[A-Z]\#*/g)
  musicinfos.forEach((info) => {
    const [sTime, eTime, title, melody] = info.split(',')
    const [sH, sM] = sTime.split(':').map(Number)
    const [eH, eM] = eTime.split(':').map(Number)
    const duration = eH * 60 + eM * 1 - (sH * 60 + sM * 1)
    const melodyList = melody.match(/[A-Z]\#*/g)

    let temp = []

    while (temp.length < duration) {
      temp = temp.concat(melodyList)
    }
    //temp가 mList를 을포함하는지 찾기.
    let isMatch = false
    for (let i = 0; i < temp.length; i++) {
      const sliced = temp.slice(i, i + mList.length)
      let allMatch = true
      for (let j = 0; j < sliced.length; j++) {
        if (sliced[j] !== mList[j] || sliced.length < mList.length) {
          allMatch = false
          break
        }
      }
      if (allMatch) {
        isMatch = true
      }
    }
    if (isMatch) {
      results.push([duration, title])
    }
  })
  results.sort((a, b) => b[0] - a[0])
  const answers = results.filter((e) => e[0] === results[0][0]).map((e) => e[1])
  answer = answers[0]
  return answer
}
