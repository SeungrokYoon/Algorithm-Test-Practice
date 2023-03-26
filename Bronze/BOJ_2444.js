const n = require('fs').readFileSync(0).toString().trim() * 1

Array(2 * n - 1)
  .fill()
  .map((_, i) => {
    const middle = n - 1
    if (i < n) {
      const delta = middle - i
      console.log(' '.repeat(delta) + '*'.repeat(2 * i + 1))
    } else {
      const delta = i - middle
      const newIndex = middle - delta
      console.log(' '.repeat(delta) + '*'.repeat(2 * newIndex + 1))
    }
  })
