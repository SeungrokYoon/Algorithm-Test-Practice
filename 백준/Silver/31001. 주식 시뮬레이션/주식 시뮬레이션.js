const input = require('fs')
  .readFileSync(process.platform == 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

class Market {
  constructor() {
    this.group = new Map()
    this.companyMap = new Map()
  }
  registerCompanyInfo(group, companyName, pricePerStock) {
    if (this.group.has(group)) {
      const groupArr = this.group.get(group)
      this.group.set(group, [...groupArr, companyName])
    } else {
      this.group.set(group, [companyName])
    }
    this.companyMap.set(companyName, pricePerStock)
  }
  command_3_companyPriceChange(company, delta) {
    const currPrice = this.companyMap.get(company)
    this.companyMap.set(company, currPrice + delta)
  }
  command_4_groupPriceChange(group, delta) {
    const companyArr = Array.from(this.group.get(group))
    for (const company of companyArr) {
      const currPrice = this.companyMap.get(company)
      this.companyMap.set(company, currPrice + delta)
    }
  }
  command_5_groupPriceChangeByPercentage(group, deltaPercent) {
    const companyArr = this.group.get(group)
    for (const company of companyArr) {
      const currPrice = this.companyMap.get(company)
      const nextPrice = currPrice + (currPrice * deltaPercent) / 100
      const adjustedPrice = Math.floor(nextPrice / 10) * 10
      this.companyMap.set(company, adjustedPrice)
    }
  }
  getCurrCompanyPrice(company) {
    return this.companyMap.get(company)
  }
}

class Hibee {
  constructor(cash) {
    this.cash = cash
    this.stockMap = new Map()
  }
  registerCompanyInfo(companyName) {
    this.stockMap.set(companyName, 0)
  }
  command_1_purchase(companyName, purchaseQuantity, currPrice) {
    const currQuantity = this.stockMap.get(companyName)
    if (currPrice * purchaseQuantity <= this.cash) {
      this.cash -= currPrice * purchaseQuantity
      this.stockMap.set(companyName, currQuantity + purchaseQuantity)
    }
  }
  command_2_sell(companyName, sellQuantity, currPrice) {
    const currQuantity = this.stockMap.get(companyName)
    if (currQuantity >= sellQuantity) {
      this.stockMap.set(companyName, currQuantity - sellQuantity)
      this.cash += currPrice * sellQuantity
    } else {
      this.stockMap.set(companyName, 0)
      this.cash += currPrice * currQuantity
    }
  }
  command_6_printCurrCash() {
    return this.cash
  }
  command_7_printTotalAsset(marketObj) {
    let total = this.cash
    const keys = this.stockMap.keys()
    for (const key of keys) {
      const price = marketObj.getCurrCompanyPrice(key)
      total += this.stockMap.get(key) * price
    }
    return total
  }
}

let [N, money, Q] = input[0].split(' ').map(Number)

const STOCK_MARKET = new Market()
const HIBEE = new Hibee(money)

for (let i = 1; i < N + 1; i++) {
  let [G, H, P] = input[i].split(' ')
  G = Number(G)
  P = Number(P)
  STOCK_MARKET.registerCompanyInfo(G, H, P)
  HIBEE.registerCompanyInfo(H)
}

const answer = []
input.slice(N + 1).forEach((l) => {
  let [command, companyOrGroupNum, quantityOrPercentage] = l.split(' ')
  command = Number(command)
  quantityOrPercentage = Number(quantityOrPercentage)
  switch (command) {
    case 1:
      HIBEE.command_1_purchase(
        companyOrGroupNum,
        quantityOrPercentage,
        STOCK_MARKET.getCurrCompanyPrice(companyOrGroupNum),
      )
      break
    case 2:
      HIBEE.command_2_sell(
        companyOrGroupNum,
        quantityOrPercentage,
        STOCK_MARKET.getCurrCompanyPrice(companyOrGroupNum),
      )
      break
    case 3:
      STOCK_MARKET.command_3_companyPriceChange(companyOrGroupNum, quantityOrPercentage)
      break
    case 4:
      STOCK_MARKET.command_4_groupPriceChange(Number(companyOrGroupNum), quantityOrPercentage)
      break
    case 5:
      STOCK_MARKET.command_5_groupPriceChangeByPercentage(
        Number(companyOrGroupNum),
        quantityOrPercentage,
      )
      break
    case 6:
      answer.push(HIBEE.command_6_printCurrCash())
      break
    case 7:
      answer.push(HIBEE.command_7_printTotalAsset(STOCK_MARKET))
      break
  }
})
console.log(answer.join('\n'))
