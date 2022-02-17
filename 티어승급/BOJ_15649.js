const [N, M] = require('fs')
  .readFileSync(__dirname + '/test.txt')
  .toString()
  .trim()
  .split(' ')
  .map(Number)

//조합 순열 진짜 쥐약이네...
const solution = () => {
  const numArr = Array.from({ length: N }, (_, index) => index + 1)
  const combinations = (elements) => {
    if (elements.length === 0) return [[]]
    const firstEl = elements[0]
    const rest = elements.slice(1)
    const combsWithoutFirst = combinations(rest)
    const combsWithFirst = []
    combsWithoutFirst.forEach((comb) => combsWithFirst.push([firstEl, ...comb]))
    return [...combsWithoutFirst, ...combsWithFirst]
  }

  const permutations = (elements) => {
    if (elements.length === 0) return [[]]
    const firstEl = elements[0]
    const rest = elements.slice(1)
    const permsWithoutFirst = permutations(rest)
    const allPermutations = []
    permsWithoutFirst.forEach((perm) => {
      for (let i = 0; i <= perm.length; i++) {
        const permWithFirst = [...perm.slice(0, i), firstEl, ...perm.slice(i)]
        allPermutations.push(permWithFirst)
      }
    })
    return allPermutations
  }
  const result = []
  const combis = combinations(numArr).filter((comb) => comb.length === M)
  combis.forEach((comb) => {
    const permu = permutations(comb)
    result.push(...permu)
  })
  result
    .map((permu) => permu.join(' '))
    .sort()
    .forEach((permu) => {
      console.log(permu)
    })
}

solution()
