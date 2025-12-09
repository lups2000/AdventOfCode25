function parse(input: string): any {
  return input.trim().split("\n");
}

export function part1(input: string) {
  const lines: string[] = parse(input);

  const points: [number, number][] = [];

  for (const line of lines) {
    const [xs, ys] = line.split(",");
    points.push([Number(xs), Number(ys)]);
  }

  let maxArea = 0;
  for (let i = 0; i < points.length; i++) {
    const firstPoint = points[i];
    for (let j = i + 1; j < points.length; j++) {
      const secondPoint = points[j];
      const currArea =
        Math.abs(firstPoint[0] - secondPoint[0] + 1) *
        Math.abs(firstPoint[1] - secondPoint[1] + 1);
      maxArea = Math.max(maxArea, currArea);
    }
  }

  return maxArea;
}

export function part2(input: string) {
  const lines: string[] = parse(input);

  const redPoints: [number, number][] = [];
  const greenPoints: [number, number][] = [];

  for (const line of lines) {
    const [xs, ys] = line.split(",");
    redPoints.push([Number(xs), Number(ys)]);
  }

  for (let i = 0; i < redPoints.length; i++) {
    const firstPoint = redPoints[i];
    const [fx, fy] = firstPoint;
    for (let j = i + 1; j < redPoints.length; j++) {
      const secondPoint = redPoints[j];
      const [sx, sy] = secondPoint;
    //   console.log(`firstPoint: ${firstPoint}, secondPoint:${secondPoint}`);
      if (fx === sx) {
        if (fy < sy) {
          for (let k = fy + 1; k < sy; k++) {
            greenPoints.push([fx, k]);
          }
        } else {
          for (let k = fy - 1; k > sy; k--) {
            greenPoints.push([fx, k]);
          }
        }
      } else if (fy === sy) {
        if (fx < sx) {
          for (let k = fx + 1; k < sx; k++) {
            greenPoints.push([k, fy]);
          }
        } else {
          for (let k = fx - 1; k > sx; k--) {
            greenPoints.push([k, fy]);
          }
        }
      }
    }
  }

  console.log(greenPoints);
}
