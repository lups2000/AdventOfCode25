function hasEqualHalves(s: string): boolean {
  const len = s.length;
  if (len % 2 !== 0) return false;

  const half = len / 2;
  for (let i = 0; i < half; i++) {
    if (s[i] !== s[half + i]) return false;
  }
  return true;
}

function isConcatenation(s: string): boolean {
  const len = s.length;
  let substring = s[0];
  let substringLen = 1;

  while (substringLen < len) {
    if (substring.repeat(len / substringLen) === s) {
      return true;
    }
    substring += s[substringLen];
    substringLen += 1;
  }
  return false;
}

export function part1(input: string) {
  const pairs = input.split(",");
  let invalidIds = 0;

  for (const pair of pairs) {
    const [start_str, end_str] = pair.split("-");

    const start = Number(start_str);
    const end = Number(end_str);

    for (let i = start; i <= end; i++) {
      if (hasEqualHalves(String(i))) invalidIds += i;
    }
  }

  return invalidIds;
}

export function part2(input: string) {
  const pairs = input.split(",");
  let invalidIds = 0;

  for (const pair of pairs) {
    const [start_str, end_str] = pair.split("-");

    const start = Number(start_str);
    const end = Number(end_str);

    for (let i = start; i <= end; i++) {
      if (isConcatenation(String(i))) invalidIds += i;
    }
  }

  return invalidIds;
}
