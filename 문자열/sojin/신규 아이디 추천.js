function solution(new_id) {
  // [^ ...]: ... 를 제외한 것을 찾기
  // \w: 알파벳 + 숫자 + _
  // 1, 2, 3, 4 단계
  new_id = new_id.toLowerCase().replace(/[^\w-.]/g, '').replace(/\.+/g, '.').replace(/^\.|\.$/g, '')
  
  // 5 단계
  if (new_id.length === 0)
    new_id = 'a'
  // 6 단계
  if (new_id.length >= 16) 
    // substr(시작 index, 끝 index)
    new_id = new_id.substr(0, 15).replace(/\.$/g, '')
  // 7 단계
  if (new_id.length <= 2) {
    let length = new_id.length
    const char = new_id[new_id.length - 1]
    while (length < 3) {
      new_id += char
      length++
    }
  }
  
  return new_id;
}