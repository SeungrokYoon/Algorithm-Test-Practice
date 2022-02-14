const input = require('fs')
  .readFileSync(__dirname + '/test.txt')
  .toString()
  .trim()
  .split('\n')

const [M, N, H] = input.shift().split(' ').map(Number)
const tomatos = []
const ripeTomatos = []

//1. 3차원 배열만들기 접근 순서는 [H][N][M]
let temp = []
temp.push(input[0].split(' ').map(Number))
for (let i = 1; i < input.length; i++) {
  const line = input[i].split(' ').map(Number)
  const floor = Math.floor(i / N)
  const row = i % N
  const day = 0
  line.forEach((num, col) => {
    num === 1 ? ripeTomatos.push({ floor, row, col, day }) : ''
  })
  if (i % N === 0) {
    tomatos.push([...temp])
    temp = []
  }
  temp.push(line)
}
tomatos.push(temp)

//2. 총 토마토의 개수세기
const getTypeTomatos = (tomatos, type) => {
  const tomatoType = { ripe: 1, unripe: 0, empty: -1 }
  let count = 0
  tomatos.forEach((floor) => {
    floor.forEach((row) => {
      count += row.filter((x) => x === tomatoType[type]).length
    })
  })
  return count
}

const matrixValidator = (h, n, m) => {
  return 0 <= h && h < H && 0 <= n && n < N && 0 <= m && m < M
}

const solution = () => {
  let totalTomatos = N * H * M - getTypeTomatos(tomatos, 'empty')
  let unripeTomatos = getTypeTomatos(tomatos, 'unripe')
  //이미 익어있는 경우
  if (getTypeTomatos(tomatos, 'ripe') === totalTomatos) return 0
  //그렇지 않은 경우
  const dFloor = [1, -1, 0, 0, 0, 0]
  const dRow = [0, 0, 1, 0, -1, 0]
  const dCol = [0, 0, 0, 1, 0, -1]
  while (ripeTomatos.length) {
    const { floor, row, col, day } = ripeTomatos.shift()
    for (let i = 0; i < 6; i++) {
      const nextFloor = dFloor[i] + floor
      const nextRow = dRow[i] + row
      const nextCol = dCol[i] + col
      const nextDay = day + 1
      if (
        matrixValidator(nextFloor, nextRow, nextCol) &&
        tomatos[nextFloor][nextRow][nextCol] === 0
      ) {
        tomatos[nextFloor][nextRow][nextCol] = 1
        unripeTomatos--
        ripeTomatos.push({ floor: nextFloor, row: nextRow, col: nextCol, day: nextDay })
      }
    }
    if (!unripeTomatos) return day + 1
  }
  return -1
}

console.log(solution())
