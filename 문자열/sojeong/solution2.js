function solution(new_id) {
  let currentId = '';
  let isEng = /[a-zA-Z]/;

  for (let i of new_id) {
      if( isEng.test(i) || !isNaN(i) || i==='-' || i ==='_' || i === '.'){
          currentId += i;
      }
  }
  currentId = currentId.toLowerCase();
  
  while (currentId.includes('..')){
    currentId = currentId.split('..').join('.');
  }

  if(currentId[0] === '.'){
    currentId = currentId.slice(1, )
  }

  if(currentId[currentId.length -1] === '.'){
    currentId = currentId.slice(0, -1)
  }

  if(currentId === ''){
    currentId = 'a';
  }

  if(currentId.length > 15){
    currentId = currentId.slice(0, 15)
    if(currentId[currentId.length -1] === '.'){
      currentId = currentId.slice(0, -1)
    }
  }
  
  if(currentId.length <= 2){
    while(currentId.length <= 2){
      currentId += currentId[currentId.length-1]
    }
  }
  return currentId;
}


//다른 사람의 풀이

function solution(new_id) {
  const answer = new_id
    .toLowerCase() // 1
    .replace(/[^\w-_.]/g, '') // 2
    .replace(/\.+/g, '.') // 3
    .replace(/^\.|\.$/g, '') // 4
    .replace(/^$/, 'a') // 5
    .slice(0, 15).replace(/\.$/, ''); // 6
  const len = answer.length;
  return len > 2 ? answer : answer + answer.charAt(len - 1).repeat(3 - len);
}