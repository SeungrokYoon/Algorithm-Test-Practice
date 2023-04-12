//S4: 설탕배달
const n = require('fs').readFileSync('test/test.txt').toString().trim() * 1
let fiveKillograms = 0
let minTotal = 5000

while (fiveKillograms <= n / 5) {
  if ((n - 5 * fiveKillograms) % 3) {
    fiveKillograms++
    continue
  }
  const threeKillograms = (n - 5 * fiveKillograms) / 3
  minTotal = Math.min(minTotal, threeKillograms + fiveKillograms)
  fiveKillograms++
}

console.log(minTotal === 5000 ? -1 : minTotal)
