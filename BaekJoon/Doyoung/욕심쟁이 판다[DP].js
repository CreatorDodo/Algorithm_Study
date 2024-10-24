const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

// 문제
// n × n의 크기의 대나무 숲이 있다. 욕심쟁이 판다는 어떤 지역에서 대나무를 먹기 시작한다. 그리고 그 곳의 대나무를 다 먹어 치우면 상, 하, 좌, 우 중 한 곳으로 이동을 한다. 그리고 또 그곳에서 대나무를 먹는다. 그런데 단 조건이 있다. 이 판다는 매우 욕심이 많아서 대나무를 먹고 자리를 옮기면 그 옮긴 지역에 그 전 지역보다 대나무가 많이 있어야 한다.

// 이 판다의 사육사는 이런 판다를 대나무 숲에 풀어 놓아야 하는데, 어떤 지점에 처음에 풀어 놓아야 하고, 어떤 곳으로 이동을 시켜야 판다가 최대한 많은 칸을 방문할 수 있는지 고민에 빠져 있다. 우리의 임무는 이 사육사를 도와주는 것이다. n × n 크기의 대나무 숲이 주어져 있을 때, 이 판다가 최대한 많은 칸을 이동하려면 어떤 경로를 통하여 움직여야 하는지 구하여라.

// 입력
// 첫째 줄에 대나무 숲의 크기 n(1 ≤ n ≤ 500)이 주어진다. 그리고 둘째 줄부터 n+1번째 줄까지 대나무 숲의 정보가 주어진다. 대나무 숲의 정보는 공백을 사이로 두고 각 지역의 대나무의 양이 정수 값으로 주어진다. 대나무의 양은 1,000,000보다 작거나 같은 자연수이다.

// 출력
// 첫째 줄에는 판다가 이동할 수 있는 칸의 수의 최댓값을 출력한다.

const n = Number(input[0]);
const forest = Array.from({ length: n }, (_, i) =>
  input[i + 1].split(" ").map(Number)
);

const dx = [0, 0, 1, -1];
const dy = [1, -1, 0, 0];

const dp = Array.from({ length: n }, () => Array(n).fill(1));

const dfs = (x, y) => {
  if (dp[x][y] !== 1) return dp[x][y];
  for (let i = 0; i < 4; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];
    if (nx >= 0 && nx < n && ny >= 0 && ny < n) {
      if (forest[x][y] < forest[nx][ny]) {
        dp[x][y] = Math.max(dp[x][y], dfs(nx, ny) + 1);
      }
    }
  }
  return dp[x][y];
};

let result = 1;
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    result = Math.max(result, dfs(i, j));
  }
}

console.log(result);
