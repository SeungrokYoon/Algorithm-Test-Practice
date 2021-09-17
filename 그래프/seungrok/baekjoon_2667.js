//백준2667 - 단지번호붙이기

const solution = (n) => {
	const cnt = [];
	for (let i = 0; i < n; i++) {
		for (let j = 0; j < n; j++) {
			if (graph[i][j]) {
				howMany++;
				DFS(i, j);
				if (memberCounter) cnt.push(memberCounter);
				memberCounter = 0;
			}
		}
	}

	console.log(howMany);
	cnt.sort((a, b) => a - b);
	if (cnt.length === 0) {
		console.log(0);
	} else {
		cnt.forEach((el) => console.log(el));
	}
};

const isPushPossible = (x, y) => {
	const n = graph.length;
	if (x >= 0 && x < n && y >= 0 && y < n && graph[x][y]) return true;
	return false;
};

const DFS = (i, j) => {
	const stack = [];
	stack.push([i, j]);
	graph[i][j] = 0;
	memberCounter++;

	while (stack.length) {
		const [x, y] = stack.pop();
		if (isPushPossible(x - 1, y)) {
			graph[x - 1][y] = 0;
			stack.push([x - 1, y]);
			memberCounter++;
		}
		if (isPushPossible(x, y - 1)) {
			graph[x][y - 1] = 0;
			stack.push([x, y - 1]);
			memberCounter++;
		}
		if (isPushPossible(x, y + 1)) {
			graph[x][y + 1] = 0;
			stack.push([x, y + 1]);
			memberCounter++;
		}
		if (isPushPossible(x + 1, y)) {
			graph[x + 1][y] = 0;
			stack.push([x + 1, y]);
			memberCounter++;
		}
	}
};

/////////////////////////////
let input = [];
let graph = [];
let n = 0;
let memberCounter = 0;
let howMany = 0;

const readline = require("readline");
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

rl.on("line", function (line) {
	input.push(line);
}).on("close", function () {
	n = input.shift();
	for (let i = 0; i < n; i++) {
		graph.push(input[i].split("").map((el) => Number(el)));
	}
	solution(n);
	process.exit();
});
