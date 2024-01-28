const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const nodeMap = input.slice(1).reduce((mapObj, line) => {
  const [parent, leftChild, rightChild] = line.split(' ')
  if (!mapObj.has(parent)) {
    mapObj.set(parent, [leftChild])
  } else {
    const children = mapObj.get(parent)
    children.push(leftChild)
  }
  if (!mapObj.has(parent)) {
    mapObj.set(parent, [rightChild])
  } else {
    const children = mapObj.get(parent)
    children.push(rightChild)
  }
  return mapObj
}, new Map())

const EMPTY_NODE = '.'

const preOrder = (MAP_OBJ, parent) => {
  if (parent === EMPTY_NODE) return ''
  let path = ''
  const children = Array.from(MAP_OBJ.get(parent))
  path += parent
  path += preOrder(MAP_OBJ, children[0])
  path += preOrder(MAP_OBJ, children[1])
  return path
}

const inOrder = (MAP_OBJ, parent) => {
  if (parent === EMPTY_NODE) return ''
  let path = ''
  const children = Array.from(MAP_OBJ.get(parent))
  path += inOrder(MAP_OBJ, children[0])
  path += parent
  path += inOrder(MAP_OBJ, children[1])
  return path
}

const postOrder = (MAP_OBJ, parent) => {
  if (parent === EMPTY_NODE) return ''
  let path = ''
  const children = Array.from(MAP_OBJ.get(parent))
  path += postOrder(MAP_OBJ, children[0])
  path += postOrder(MAP_OBJ, children[1])
  path += parent
  return path
}
const answer =
  preOrder(nodeMap, 'A') + '\n' + inOrder(nodeMap, 'A') + '\n' + postOrder(nodeMap, 'A')

console.log(answer)
