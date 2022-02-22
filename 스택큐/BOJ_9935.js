const [str, bomb] = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n')

const solution = () => {
  const stack = []
  for (const ch of str) {
    stack.push(ch)
    while (stack.slice(stack.length - bomb.length, stack.length).join('') === bomb) {
      for (let i = 0; i < bomb.length; i++) {
        stack.pop()
      }
    }
  }
  return stack.length ? stack.join('') : 'FRULA'
}
console.log(solution())
