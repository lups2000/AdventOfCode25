function parse(input: string): any {
  return input.trim().split("\n");
}

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

export function part1(input: string): number {
  let startRotation = 50;
  let cntZeros = 0;
  const lines: string[] = parse(input);

  for (const line of lines) {
    const dir: string = line.slice(0, 1);
    const value: number = Number(line.slice(1));

    const sign = dir === "L" ? -1 : 1;

    startRotation = mod(startRotation + sign * value, 100);

    if (startRotation === 0) {
      cntZeros += 1;
    }
  }

  return cntZeros;
}

export function part2(input: string): number {
  let startRotation = 50;
  let cntZeros = 0;
  const lines: string[] = parse(input);

  for (const line of lines) {
    const dir: string = line.slice(0, 1);
    const value: number = Number(line.slice(1));

    const sign = dir === "L" ? -1 : 1;
    const unwrapped = startRotation - sign * value;
    let division = 0;

    if (dir === "L") {
      division = Math.abs(
        Math.floor(unwrapped / 100) - Math.floor(startRotation / 100)
      );
    } else {
      division = Math.abs(
        Math.floor((unwrapped - 1) / 100) -
          Math.floor((startRotation - 1) / 100)
      );
    }

    const wrapped = mod(unwrapped, 100);

    cntZeros += division;
    startRotation = wrapped;
  }

  return cntZeros;
}
