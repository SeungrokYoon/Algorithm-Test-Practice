// 나의 풀이
function solution(record) {
  const users = {};
  const answer = [];
  let current_record = '';

  for (let item of record){
      current_record = item.split(' ');
      if(current_record[0] === 'Enter'){
          users[current_record[1]] = current_record[2];
      }
      if(current_record[0] === 'Change'){
          users[current_record[1]] = current_record[2];
      }
  }
  
  for (let item of record){
      current_record = item.split(' ');
      if(current_record[0] === 'Enter'){
          answer.push(users[current_record[1]] + '님이 들어왔습니다.')
      }
      if(current_record[0] === 'Leave'){
          answer.push(users[current_record[1]] + '님이 나갔습니다.')
      }
  }
  return answer;
}

// 다른 분의 풀이
function solution(record) {
  const userInfo = {};
  const action = [];
  const stateMapping = {
      'Enter': '님이 들어왔습니다.',
      'Leave': '님이 나갔습니다.'
  }

  record.forEach((v) => {
      const [state, id, nick] = v.split(' ');

      if(state !== "Change") {
          action.push([state, id]);
      }

      if(nick) {
          userInfo[id] = nick;
      }
  })

  return action.map(([state, uid]) => {
      return `${userInfo[uid]}${stateMapping[state]}`;
  })
}