//https://programmers.co.kr/learn/courses/30/lessons/43163?language=javascript
//단어 변환 코딩테스트 연습 깊이/너비 우선 탐색(DFS/BFS) 단어 변환
class Node{
  constructor(value,depth){
      this.value = value   
      this.depth = depth
      this.next = null
  }
}

class Queue{
  constructor(){
      this.head = null
      this.tail = null
  }
  
  dequeue(){
      if (this.head ===null) {
          console.log("Queue is empty")
          return null
      }
      if (this.head === this.tail) {
          const returnNode = this.head
          this.head = null
          this.tail = null
          return returnNode
      }
      const returnNode = this.head
      this.head = this.head.next
      return returnNode
      
  }
  
  enqueue(value,depth){
      const newNode = new Node(value,depth)
      if (!this.head){
          this.head = newNode
          this.tail = newNode
          return
      }
      this.tail.next = newNode
      this.tail = newNode
  }
  isEmpty(){
      return this.tail === this.head ? true :false
  }
  
  print(){
      let current = this.head
      while(current){
          console.log(current.value)
          current = current.next
      }
  }//print
}//class Node

function compareHelper(aWord, bWord){
  let difference =0;
  for (let i =0; i< aWord.length ;i++){
      if ( aWord[i] !== bWord[i] ){
          difference+=1
      }
  }//for    
  return difference ===1 ? true : false
}//compareHelper


function solution(begin, target, words) {
  var answer = 0;
  return answer;
}

function solution(begin, target, words) {
  var answer = 0;
  if( !words.includes(target)){
    return 0
  }
  const queue = new Queue()
  const visited = new Array(words.length).fill(false)
  queue.enqueue(begin,0)

  while (queue.head){
      const currentNode = queue.dequeue()
      for(let i = 0 ; i< words.length; i++){
        if (visited[i]) continue
        if (compareHelper(currentNode.value, words[i]) && words[i]!==target){
            console.log("enqueue",words[i],currentNode.depth+1)
            queue.enqueue(words[i],currentNode.depth+1)
            visited[i] = true
        }
        if (compareHelper(currentNode.value, words[i]) && words[i]===target){
          answer = currentNode.depth+1
          return answer
      }
    }
  }
  queue.print()
  return answer;
}//solution