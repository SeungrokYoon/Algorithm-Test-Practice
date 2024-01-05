const input = require('fs')
  .readFileSync(process.platform == 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const elements =
  'ac ag al am ar as at au b ba be bh bi bk br c ca cd ce cf cl cm cn co cr cs cu db ds dy er es eu f fe fl fm fr ga gd ge h he hf hg ho hs i in ir k kr la li lr lu lv md mg mn mo mt n na nb nd ne ni no np o os p pa pb pd pm po pr pt pu ra rb re rf rg rh rn ru s sb sc se sg si sm sn sr ta tb tc te th ti tl tm u v w xe y yb zn zr'.split(
    ' ',
  )

const solution = (str) => {
  const queue = [str]
  let found = false
  let visitedStrSet = new Set()
  while (queue.length) {
    const popped = queue.shift()
    if (elements.includes(popped)) {
      found = true
      continue
    }
    for (const el of elements) {
      if (!popped.startsWith(el)) continue
      const nextStr = popped.slice(el.length)
      if (visitedStrSet.has(nextStr)) continue
      visitedStrSet.add(nextStr)
      queue.push(nextStr)
    }
  }
  return found ? 'YES' : 'NO'
}

const answer = []
input.slice(1).forEach((str) => {
  answer.push(solution(str))
})

console.log(answer.join('\n'))
