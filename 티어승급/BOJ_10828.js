//이 과정을 줄여볼게
const input = require('fs')
  .readFileSync(__dirname + '/test.txt')
  .toString()
  .trim()
  .split('\n')

const N = input.shift()
const solution = () => {
  const stack = []
  let result = ''
  for (const commandStr of input) {
    if (commandStr.length >= 6) {
      //push
      const [command, num] = commandStr.split(' ')
      stack.push(num)
    } else if (commandStr === 'top') {
      result += (stack.length ? stack[stack.length - 1] : -1) + '\n'
    } else if (commandStr === 'size') {
      result += stack.length + '\n'
    } else if (commandStr === 'pop') {
      const popped = stack.length ? stack.pop() : -1
      result += popped + '\n'
    } else {
      //empty
      result += (stack.length ? 0 : 1) + '\n'
    }
  }
  return result.trim()
}
console.log(solution())
