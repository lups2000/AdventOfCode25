function parse(input: string): any {
  return input.trim().split("\n");
}

const key = (r: number, c: number) => `${r},${c}`;

function dfs(
  r: number,
  c: number,
  matrix: string[][],
  cache: Map<string, number>
): number {
  const rows = matrix.length;
  const cols = matrix[0].length;
  let cnt = 0;

  if (cache.has(key(r, c))) {
    return cache.get(key(r, c))!;
  }

  if (r === rows - 1) {
    return 1;
  }

  if (c < 0 || c >= cols) return 0;

  if (matrix[r][c] === "S" || matrix[r][c] === ".") {
    cnt += dfs(r + 1, c, matrix, cache);
  } else {
    cnt += dfs(r + 1, c - 1, matrix, cache) + dfs(r + 1, c + 1, matrix, cache);
  }

  cache.set(key(r, c), cnt);

  return cnt;
}

export function part1(input: string) {
  const lines: string[] = parse(input);
  const matrix: string[][] = lines.map((line) => line.split(""));

  const rows = matrix.length;
  const cols = matrix[0].length;
  let start = [0, 0];
  for (let c = 0; c < cols; c++) {
    if (matrix[0][c] === "S") {
      start[1] = c;
      break;
    }
  }

  let splits = 0;
  const q = [start];
  const visited = new Set<string>();
  visited.add(key(start[0], start[1]));

  while (q.length) {
    const [pr, pc] = q.shift()!;

    const downR = pr + 1;
    if (downR >= rows || visited.has(key(downR, pc))) continue;

    if (matrix[downR][pc] === ".") {
      q.push([downR, pc]);
      visited.add(key(downR, pc));
    } else {
      let cnt = 0;
      if (pc + 1 < cols && !visited.has(key(downR, pc + 1))) {
        q.push([downR, pc + 1]);
        visited.add(key(downR, pc + 1));
        cnt += 1;
      }

      if (pc - 1 >= 0 && !visited.has(key(downR, pc - 1))) {
        q.push([downR, pc - 1]);
        visited.add(key(downR, pc - 1));
        cnt += 1;
      }

      if (cnt >= 1) splits += 1;
    }
  }

  return splits;
}

export function part2(input: string) {
  const lines: string[] = parse(input);
  const matrix: string[][] = lines.map((line) => line.split(""));

  const rows = matrix.length;
  const cols = matrix[0].length;
  let start = [0, 0];
  for (let c = 0; c < cols; c++) {
    if (matrix[0][c] === "S") {
      start[1] = c;
      break;
    }
  }

  const cache = new Map<string, number>();

  return dfs(start[0], start[1], matrix, cache);
}
