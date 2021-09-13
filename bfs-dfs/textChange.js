const isChanged = (before, after) => {
  let isChecked = false;
  const afterItor = after[Symbol.iterator]();

  for (const string of before) {
    if (string === afterItor.next().value) continue;
    if (isChecked) {
      isChecked = false;
      break;
    }

    isChecked = true;
  }

  return isChecked;
};

function solution(begin, target, words) {
  const result = { isChecked: false, count: 0 };
  const length = words.length;
  const visited = Array.from({ length }, () => false);
  const queue = [begin];

  while (queue.length > 0) {
    result.count++;

    if (result.isChecked) break;

    let nowDepsTryCount = queue.length;

    while (nowDepsTryCount--) {
      const now = queue.shift();

      for (let i = 0; i < length; i++) {
        if (visited[i]) continue;
        if (!isChanged(now, words[i])) continue;
        if (words[i] === target) {
          result.isChecked = true;
          break;
        }

        visited[i] = true;
        queue.push(words[i]);
      }
    }
  }

  return result.isChecked ? result.count : 0;
}
