const N =
  require('fs')
    .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
    .toString()
    .trim() * 1

const starMap = new Array(N).fill(0).map((v) => new Array(N).fill('*'))

const recursion = (array, x, y, delta) => {
  if (delta === 1) return
  else {
    const childDelta = delta / 3
    for (let row = x + childDelta; row < x + 2 * childDelta; row++) {
      for (let col = y + childDelta; col < y + 2 * childDelta; col++) {
        array[row][col] = ' '
      }
    }
    recursion(array, x, y, childDelta)
    recursion(array, x + childDelta, y, childDelta)
    recursion(array, x, y + childDelta, childDelta)
    recursion(array, x + 2 * childDelta, y, childDelta)
    recursion(array, x, y + 2 * childDelta, childDelta)
    recursion(array, x + 2 * childDelta, y + childDelta, childDelta)
    recursion(array, x + childDelta, y + 2 * childDelta, childDelta)
    recursion(array, x + 2 * childDelta, y + 2 * childDelta, childDelta)
  }
  return array
}

const recurStar = (size) => {
  if (size === 3) return ['***', '* *', '***']
  const prev = recurStar(size / 3)
  let ret = []
  for (let line of prev) {
    ret.push(line.repeat(3))
  }
  for (let line of prev) {
    ret.push(line + ' '.repeat(size / 3) + line)
  }
  for (let line of prev) {
    ret.push(line.repeat(3))
  }
  return ret
}

const arr = recurStar(N)
console.log(arr.join('\n'))
