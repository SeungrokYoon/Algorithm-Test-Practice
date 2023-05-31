const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')
input.shift()

const solution = ({ N, M, documents }) => {
  const printerInfo = documents.reduce((obj, curr) => {
    obj[curr] ? obj[curr]++ : (obj[curr] = 1)
    return obj
  }, {})
  const mutatedDocuments = documents.map((weight, index) => ({ weight, index }))

  let answer = 0
  let found = false
  while (!found) {
    const priorityWeight = Number(
      Object.entries(printerInfo)
        .filter((entry) => entry[1] > 0)
        .sort((a, b) => Number(b[0]) - Number(a[0]))[0][0],
    )
    if (mutatedDocuments[0].weight < priorityWeight) {
      const dequeued = mutatedDocuments.shift()
      mutatedDocuments.push(dequeued)
    } else {
      mutatedDocuments[0].index === M ? (found = true) : printerInfo[priorityWeight]--
      mutatedDocuments.shift()
      answer++
    }
  }
  return answer
}

for (let i = 0; i < input.length; i += 2) {
  const [N, M] = input[i].split(' ').map(Number)
  const documents = input[i + 1].split(' ').map(Number)
  console.log(solution({ N, M, documents }))
}
