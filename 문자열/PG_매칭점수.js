function solution(word, pages) {
  word = word.toLowerCase()
  var answer = 0
  const pagesData = {}
  const pageURLs = []
  pages.forEach((page, i) => {
    page = page.toLowerCase()
    const notAlphabetRegExp = new RegExp(/[\d|\W]/, 'gi')
    //positive lookbehind, positive lookahead
    const urlRegExp = new RegExp(
      /(?<=<meta property="og:url" content="https:\/\/)\S*(?="\/>)/,
      'gi',
    )
    const aTagRegExp = new RegExp(/(?<=<a href="https:\/\/)\S*(?=">)/, 'gi')
    const pageURL = page.match(urlRegExp)[0]
    const basicScore = page.split(notAlphabetRegExp).filter((e) => e === word).length
    let outLinks = 0
    let outLinksURL = []
    let aTagLists = page.match(aTagRegExp)
    if (aTagLists !== null) {
      aTagLists.forEach((outLink) => {
        outLinks++
        outLinksURL.push(outLink)
      })
    }
    pagesData[pageURL] = { pageURL, basicScore, linkScore: 0, matchScore: 0, outLinks, outLinksURL }
    pageURLs.push(pageURL)
  })
  //linkScore채워가기
  pageURLs.forEach((pageURL, index) => {
    const data = pagesData[pageURL]
    //외부로 연결된 링크가 없다면 넘어가
    if (data.outLinks === 0) return
    //외부ㅗ 연결된 링크가 존재하는 경우에는 링크 점수 계산해주기
    data.outLinksURL.forEach((targetPage) => {
      if (targetPage in pagesData) {
        pagesData[targetPage].linkScore +=
          targetPage in pagesData
            ? pagesData[data.pageURL].basicScore / pagesData[data.pageURL].outLinks
            : 0
      }
    })
  })
  const result = Object.values(pagesData).map((data, i) => [data.basicScore + data.linkScore, i])
  result.sort((a, b) => b[0] - a[0] || a[1] - b[1])
  answer = result[0][1]
  return answer
}
