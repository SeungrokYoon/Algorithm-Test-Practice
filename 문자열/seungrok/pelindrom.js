//백준 17609  회문 문자열
const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().split("\n");

function isPelindrom(subSentence) {
	let left = 0;
	let right = subSentence.length - 1;
	while (left <= right) {
		if (subSentence[left] !== subSentence[right]) {
			return [false, left, right];
		}
		left++;
		right--;
	}
	return [true, left, right];
}

function solution(sentence) {
	const firstTry = isPelindrom(sentence);
	if (firstTry[0]) return 0;

	const withoutRight = isPelindrom(sentence.slice(firstTry[1], firstTry[2]))[0];
	const withoutLeft = isPelindrom(
		sentence.slice(firstTry[1] + 1, firstTry[2] + 1)
	)[0];

	if (withoutRight || withoutLeft) {
		return 1;
	}
	return 2;
}

for (let i = 1; i <= input[0]; i += 1) {
	console.log(solution(input[i]));
}
