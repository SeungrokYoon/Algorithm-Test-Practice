function solution(msg) {
  var answer = []
  const map = {}
  //1.
  for (let i = 65; i < 65 + 26; i++) {
    map[String.fromCharCode(i)] = i - 64
  }
  let newIndex = 27
  while (msg.length) {
    let temp = msg[0]
    //2.
    for (let i = 1; i < msg.length; i++) {
      if (temp + msg[i] in map) {
        temp += msg[i]
      } else break
    }
    //3.
    answer.push(map[temp])
    msg = msg.slice(temp.length)
    //4.
    if (msg.length) {
      map[temp + msg[0]] = newIndex
      newIndex++
    }
  }
  return answer
}
