function solution(files) {
  var answer = []
  const parsedData = []
  files.forEach((f) => {
    const parsed = parser(f)
    parsedData.push(parsed)
    parsedData.sort((a, b) => a.head.localeCompare(b.head) || a.number - b.number)
  })
  answer = parsedData.map((data) => data.originalFileName)
  return answer
}

const parser = (fileName) => {
  let parsed = ''
  const [name, extension] = fileName.replace(/\s/g, '').split('.')
  //head number tail
  const [head, number, tail] = name.match(/^[a-zA-Z-\s]+|[0-9]{1,5}|[\w|0-9]*$/g)
  return { head: head.toLowerCase(), number: Number(number), tail, originalFileName: fileName }
}
