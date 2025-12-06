function parse(input: string): any {
  return input.split("\n");
}

function transpose(matrix: string[][]): string[][] {
  const rows = matrix.length;
  const cols = matrix[0].length;

  const result = Array.from({ length: cols }, () => Array(rows));

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      result[c][r] = matrix[r][c];
    }
  }

  return result;
}

export function part1(input: string): number {
  const lines = parse(input);
  const matrix: string[][] = lines.map((line: string) =>
    line.split(" ").filter((l) => l !== "")
  );

  const transposed = transpose(matrix);

  let total = 0;
  const rows = transposed.length;
  const cols = transposed[0].length;

  for (let r = 0; r < rows; r++) {
    const operation = transposed[r][cols - 1];
    let curr = operation === "*" ? 1 : 0;
    for (let c = cols - 2; c >= 0; c--) {
      if (operation === "*") {
        curr *= parseInt(transposed[r][c]);
      } else {
        curr += parseInt(transposed[r][c]);
      }
    }
    total += curr;
  }

  return total;
}

export function part2(input: string) {
  const lines = parse(input);
  const rawRows: string[][] = lines.map((line: string) => line.split(""));

  const maxLen = Math.max(...rawRows.map((row) => row.length));

  // pad each row with " " to match maxLen
  const matrix = rawRows.map((row) => {
    if (row.length < maxLen) {
      return [...row, ...Array(maxLen - row.length).fill(" ")];
    }
    return row;
  });

  const transposed = transpose(matrix);

  let total = 0;
  const rows = transposed.length;
  let curr = 0;
  let operation = "";

  for (let r = 0; r < rows; r++) {
    const currString = transposed[r].join("");
    const currNumber = Number(currString.replace(/\D/g, ""));
    if (currString.includes("*") || currString.includes("+")) {
      operation = currString.includes("*") ? "*" : "+";
      curr = currNumber;
    } else if (currString.trim() === "") {
      total += curr;
    } else {
      if (operation === "*") {
        curr *= currNumber;
      } else {
        curr += currNumber;
      }
    }
  }

  total += curr;

  return total;
}
