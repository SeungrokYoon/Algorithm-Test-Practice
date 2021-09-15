//나의 풀이
const fs = require("fs");
const [N, K] = fs
  .readFileSync("input")
  .toString()
  .split(" ")
  .map((v) => parseInt(v));

const MAX = 100001;

const myBfs = (N, K) => {
  const visited = Array.from({ length: MAX }, () => false);
  const queue = [N];
  let time = -1;
  const push = (now) => {
    if (now === 1 || now === 0) return;
    let i = 2;

    while (i++) {
      if (i * now >= MAX) break;
      if (visited[i * now]) break;

      queue.push(i * now);
      visited[i * now] = true;
    }
  };

  visited[N] = true;
  push(N);

  while (queue.length) {
    time++;
    let check = queue.length;

    while (check--) {
      const now = queue.shift();
      const nextBack = 0 <= now - 1 && now - 1 < MAX ? now - 1 : -1;
      const nextFront = now + 1 < MAX && now + 1 >= 0 ? now + 1 : -1;

      if (now === K) return time;

      if (nextBack >= 0 && !visited[nextBack]) {
        queue.push(nextBack);
        visited[nextBack] = true;

        push(nextBack);
      }

      if (nextFront >= 0 && !visited[nextFront]) {
        queue.push(nextFront);
        visited[nextFront] = true;

        push(nextFront);
      }
    }
  }
};
// 다른 사람 풀이
const bfs = (N, K) => {
  const queue = [{ position: N, time: 0 }];
  const visited = Array.from({ length: MAX }, () => false);
  visited[N] = true;

  const pushDouble = (now) => {
    const { position, time } = now;
    let nextPosition = position * 2;
    while (true) {
      const isCheck = 1 < nextPosition && nextPosition < MAX;

      if (!isCheck || visited[nextPosition]) break;

      visited[nextPosition] = true;
      queue.unshift({ position: nextPosition, time });
    }
    return;
  };

  const pushFB = (now) => {
    const { position, time } = now;
    const front = { position: position + 1, time: time + 1 };
    const back = { position: position - 1, time: time + 1 };
    const isCheck = (position) => 0 <= position && position < MAX;

    if (isCheck(front.position) && !visited[front.position]) {
      queue.push(front);
      visited[front.position] = true;
    }

    if (isCheck(back.position) && !visited[back.position]) {
      queue.push(back);
      visited[back.position] = true;
    }
  };

  while (queue.length) {
    const now = queue.shift();
    if (now.position === K) return now.time;

    pushDouble(now);
    pushFB(now);
  }
};

console.log(bfs(N, K));
