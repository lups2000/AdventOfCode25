function parse(input: string): any {
  return input.trim().split("\n");
}

export function part1(input: string): number {
  const lines: string[] = parse(input);
  const matrix = lines.map((line) => line.split(""));

  const rows = matrix.length;
  const cols = matrix[0].length;
  const directions: readonly [number, number][] = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ];

  let totRolls = 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (matrix[r][c] !== "@") continue;

      let neighbors = 0;
      for (const [dr, dc] of directions) {
        const nr = r + dr;
        const nc = c + dc;
        if (
          nr >= 0 &&
          nr < rows &&
          nc >= 0 &&
          nc < cols &&
          matrix[nr][nc] === "@"
        ) {
          neighbors++;
        }

        if (neighbors >= 4) break;
      }

      if (neighbors < 4) totRolls++;
    }
  }

  return totRolls;
}

export function part2(input: string) {
  const lines: string[] = parse(input);
  const matrix = lines.map((line) => line.split(""));

  const rows = matrix.length;
  const cols = matrix[0].length;
  const directions: readonly [number, number][] = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ];

  let totalRemoved = 0;

  while (true) {
    let currRemoved = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (matrix[r][c] !== "@") continue;

        let neighbors = 0;
        for (const [dr, dc] of directions) {
          const nr = r + dr;
          const nc = c + dc;
          if (
            nr >= 0 &&
            nr < rows &&
            nc >= 0 &&
            nc < cols &&
            matrix[nr][nc] === "@"
          ) {
            neighbors++;
          }

          if (neighbors >= 4) break;
        }

        if (neighbors < 4) {
          matrix[r][c] = ".";
          currRemoved += 1;
        }
      }
    }

    if (currRemoved === 0) {
      return totalRemoved;
    }
    totalRemoved += currRemoved;
  }
}
