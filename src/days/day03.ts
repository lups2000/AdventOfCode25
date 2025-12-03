function parse(input: string): any {
  return input.trim().split("\n");
}

function calculateJoltageBankEasy(bank: string): number {
  let start = 0;
  let end = 1;
  let maxJoltage = 0;
  while (end < bank.length) {
    const currJoltage = parseInt(bank[start] + bank[end]);
    maxJoltage = Math.max(maxJoltage, currJoltage);
    if (parseInt(bank[end]) > parseInt(bank[start])) {
      start = end;
    }
    end += 1;
  }
  return maxJoltage;
}

function calculateJoltageBankHard(bank: string): number {
  const monotonicStack = [];
  let remaining = bank.length - 12;
  for (const c of bank) {
    while (
      remaining > 0 &&
      monotonicStack.length > 0 &&
      c > monotonicStack[monotonicStack.length - 1]
    ) {
      monotonicStack.pop();
      remaining -= 1;
    }
    monotonicStack.push(c);
  }

  const maxJoltageString = monotonicStack.slice(0, 12).join("");

  return parseInt(maxJoltageString);
}

export function part1(input: string) {
  const lines: string[] = parse(input);
  let maxJoltage = 0;
  for (const line of lines) {
    maxJoltage += calculateJoltageBankEasy(line);
  }

  return maxJoltage;
}

export function part2(input: string) {
  const lines: string[] = parse(input);
  let maxJoltage = 0;
  for (const line of lines) {
    maxJoltage += calculateJoltageBankHard(line);
  }

  return maxJoltage;
}
