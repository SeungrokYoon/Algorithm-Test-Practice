function solution(numbers, target) {
	let answer = 0;
	const queue = [];
	const max_trial = numbers.length;
	let pointer = 0;

	queue.push([numbers[0] * 1, 1]);
	queue.push([numbers[0] * -1, 1]);
	//BFS
	while (pointer < queue.length) {
		const [number, count] = queue[pointer];
		if (count > max_trial) break;
		if (number === target && count === max_trial) {
			answer++;
		}
		queue.push([number + numbers[count] * 1, count + 1]);
		queue.push([number + numbers[count] * -1, count + 1]);
		pointer++;
	} //while
	return answer;
} //solution
