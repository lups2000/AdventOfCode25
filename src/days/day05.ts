function parse(input: string): any {
  return input.trim().split("\n");
}

function mergeIntervals(ranges: [number, number][]): [number, number][] {
  const mergedRanges: [number, number][] = [ranges[0]];
  const n = ranges.length;

  for (let i = 1; i < n; i++) {
    const [curr_s, curr_e] = ranges[i];
    const last = mergedRanges[mergedRanges.length - 1];
    const [_, prev_e] = last;
    if (curr_s <= prev_e + 1) {
      last[1] = Math.max(prev_e, curr_e);
    } else {
      mergedRanges.push([curr_s, curr_e]);
    }
  }
  return mergedRanges;
}

export function part1(input: string): number {
  const lines: string[] = parse(input);
  const ranges: [number, number][] = [];
  let fresh = 0;
  for (const line of lines) {
    if (line.includes("-")) {
      const [start, end] = line.split("-");
      ranges.push([Number(start), Number(end)]);
    } else if (line != "") {
      const currId = Number(line);
      for (const range of ranges) {
        if (currId >= range[0] && currId <= range[1]) {
          fresh += 1;
          break;
        }
      }
    }
  }

  return fresh;
}

export function part2(input: string): number {
  const lines: string[] = parse(input);
  const ranges: [number, number][] = [];
  for (const line of lines) {
    if (line.includes("-")) {
      const [start, end] = line.split("-");
      ranges.push([Number(start), Number(end)]);
    }
  }

  ranges.sort((a, b) => {
    return a[0] - b[0] || a[1] - b[1];
  });

  const mergedRanges: [number, number][] = mergeIntervals(ranges);

  let fresh = 0;

  for (const [s, e] of mergedRanges) {
    fresh += e - s + 1;
  }

  return fresh;
}
