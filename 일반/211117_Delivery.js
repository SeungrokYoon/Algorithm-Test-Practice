//문제: 코딩테스트 연습 Summer/Winter Coding(~2018) 배달
//링크: https://programmers.co.kr/learn/courses/30/lessons/12978#

//예외케이스
//5,[[1, 2, 4], [1, 3, 1], [3, 4, 1], [4, 2, 1], [2, 5, 1]], 4

function solution(N, road, K) {
  let answer = 0;
  const visited = new Array(N + 1).fill(0);
  const linkedList = {};

  //make graph
  for (let info of road) {
    const [start, end, weight] = info;
    !linkedList[start]
      ? (linkedList[start] = [[end, weight]])
      : linkedList[start].push([end, weight]);
    !linkedList[end]
      ? (linkedList[end] = [[start, weight]])
      : linkedList[end].push([start, weight]);
  }

  //BFS
  const queue = [];
  visited[0] = -1;
  visited[1] = -1;
  queue.push([1, 0]);
  answer++;
  while (queue.length) {
    const [startNode, currentDist] = queue.shift();
    for (let end of linkedList[startNode]) {
      const [endNode, nextDist] = end;

      if (currentDist + nextDist <= K) {
        const possibleNode = [endNode, currentDist + nextDist];
        if (visited[endNode] === 0) {
          visited[endNode] = currentDist + nextDist;
          queue.push(possibleNode);
          answer++;
          //console.log(`possibleNode ${possibleNode} enqueued`);
          continue;
        }
        if (visited[endNode] > currentDist + nextDist) {
          if (visited[endNode] <= K) {
            visited[endNode] = currentDist + nextDist;
            //console.log(`possibleNode ${possibleNode} just updated`);
            queue.push(possibleNode);
            continue;
          }
          visited[endNode] = currentDist + nextDist;
          queue.push(possibleNode);
          answer++;
          //console.log(`possibleNode ${possibleNode} enqueued and updated`);
        }
      }
    }
  }

  return answer;
}
