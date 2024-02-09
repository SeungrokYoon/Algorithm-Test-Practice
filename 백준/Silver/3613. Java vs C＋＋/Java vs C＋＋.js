const inputStr = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()

const isCPlusPlus = (str) => {
  const includesDash = str.includes('_')
  const noConsecutiveUnderscoreRegexp = new RegExp('^(?!.*__).*$')
  const noConsecutiveUnderscore = noConsecutiveUnderscoreRegexp.test(str)
  const allLowerCase = str.split('').filter((ch) => ch === ch.toLowerCase()).length === str.length
  const dashNotInTheEnd = new RegExp('^(?!_)(?!.*_$).+$')
  return includesDash && allLowerCase && noConsecutiveUnderscore && dashNotInTheEnd.test(str)
}

const isJava = (str) => {
  return !str.includes('_') && str[0] === str[0].toLowerCase()
}

const convertCPlusPlusToJava = (str) => {
  let answer = ''
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '_') {
      if (i + 1 < str.length) {
        answer += str[i + 1].toUpperCase()
        i++
      }
    } else {
      answer += str[i]
    }
  }
  return answer[0].toLowerCase() + answer.slice(1)
}

const convertJavaToCPlusPlus = (str) => {
  let answer = ''
  for (let i = 0; i < str.length; i++) {
    if (str[i] === str[i].toUpperCase()) {
      answer += '_' + str[i].toLowerCase()
    } else {
      answer += str[i]
    }
  }
  return answer
}

if (isJava(inputStr)) {
  console.log(convertJavaToCPlusPlus(inputStr))
} else if (isCPlusPlus(inputStr)) {
  console.log(convertCPlusPlusToJava(inputStr))
} else {
  console.log('Error!')
}
