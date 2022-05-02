https://programmers.co.kr/learn/courses/30/lessons/64065
const parser = (s) =>{
  const showMap = {}
  let tempStr =''
  let isOpen= false
  for(const c of s){
      if(c==='{'){
          isOpen = true
      }
      else if(c==='}'){
          isOpen=false
          const num = Number(tempStr)
          if(num in showMap){
              showMap[num].showCount++
          }else{
              showMap[num] = {number:num, showCount : 1}
          }
          tempStr=''
      }else if(c===','){
          if(isOpen){
              const num = Number(tempStr)
              if(num in showMap){
                  showMap[num].showCount++
              }else{
                  showMap[num] = {number:num, showCount : 1}
              }
          }
          tempStr=''
      }else{
        tempStr+=c   
      }
  }
  const parsed = Object.values(showMap)
  parsed.sort((a,b)=>b.showCount-a.showCount)
  return parsed
}

function solution(s) {
  const answer = parser(s.slice(1,s.length-1)).map(e=>e.number)
  return answer;
}