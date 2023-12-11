const N = +require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()

const A = 300
const B = 60
const C = 10

const counter = {
  A: 0,
  B: 0,
  C: 0,
}

const isMakable = N % 10 === 0
let remaining = N

while (isMakable && remaining) {
  if (remaining >= A) {
    counter.A++
    remaining -= A
  } else if (remaining >= B) {
    counter.B++
    remaining -= B
  } else {
    counter.C++
    remaining -= C
  }
}

console.log(isMakable ? `${counter.A} ${counter.B} ${counter.C}` : -1)
