// 백준 - 12865 : 평범한 배낭
// 링크 : https://www.acmicpc.net/problem/12865

const readline = require("readline");

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

const solution = () => {};

const arr = [];

rl.on("line", (line) => {
	arr.push(line);
}).on("close", function () {
	solution();
	process.exit();
});
