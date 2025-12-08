function parse(input: string): any {
  return input.trim().split("\n");
}

function calculateDistance(
  points: [number, number, number][],
  start: number,
  end: number
): number {
  const startPoint = points[start];
  const endPoint = points[end];
  return (
    (startPoint[0] - endPoint[0]) ** 2 +
    (startPoint[1] - endPoint[1]) ** 2 +
    (startPoint[2] - endPoint[2]) ** 2
  );
}

function createGraph(
  points: [number, number, number][],
  points_distances: [number, number, number][],
  k: number
) {
  const graph: Map<number, number[]> = new Map();
  const numPoints = points.length;
  for (let i = 0; i < numPoints; i++) {
    graph.set(i, []);
  }

  for (let i = 0; i < k; i++) {
    const currObject = points_distances[i];
    const start = currObject[0];
    const end = currObject[1];

    graph.get(start)?.push(end);
    graph.get(end)?.push(start);
  }

  return graph;
}

function createGraph2(
  points: [number, number, number][],
  points_distances: [number, number, number][],
  k: number
): [Map<number, number[]>, [number, number, number], [number, number, number]] {
  const graph: Map<number, number[]> = new Map();
  const numPoints = points.length;
  for (let i = 0; i < numPoints; i++) {
    graph.set(i, []);
  }

  let first: [number, number, number] = [0, 0, 0];
  let final: [number, number, number] = [0, 0, 0];
  for (let i = 0; i < k; i++) {
    const currObject = points_distances[i];
    const start = currObject[0];
    const end = currObject[1];

    if (i === k - 1) {
      first = points[start];
      final = points[end];
    }

    graph.get(start)?.push(end);
    graph.get(end)?.push(start);
  }

  return [graph, first, final];
}

function findSizesConnectedComponents(
  numPoints: number,
  graph: Map<number, number[]>
) {
  const sizes: number[] = [];
  const visited = new Set();
  for (let i = 0; i < numPoints; i++) {
    if (visited.has(i)) continue;
    visited.add(i);
    let nodesReached = 1;
    const stack = [i];
    while (stack.length) {
      const popped = stack.pop()!;
      for (const neigh of graph.get(popped)!) {
        if (!visited.has(neigh)) {
          stack.push(neigh);
          visited.add(neigh);
          nodesReached += 1;
        }
      }
    }
    sizes.push(nodesReached);
  }

  return sizes;
}

export function part1(input: string) {
  const lines: string[] = parse(input);

  const points: [number, number, number][] = [];

  for (const line of lines) {
    const [xs, ys, zs] = line.split(",");
    points.push([Number(xs), Number(ys), Number(zs)]);
  }

  const points_distances: [number, number, number][] = [];

  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      points_distances.push([i, j, calculateDistance(points, i, j)]);
    }
  }

  points_distances.sort((a, b) => a[2] - b[2]);

  const graph = createGraph(points, points_distances, 1000);

  const sizesConnectedComponents = findSizesConnectedComponents(
    points.length,
    graph
  );

  sizesConnectedComponents.sort((a, b) => b - a);

  return (
    sizesConnectedComponents[0] *
    sizesConnectedComponents[1] *
    sizesConnectedComponents[2]
  );
}

export function part2(input: string) {
  const lines: string[] = parse(input);

  const points: [number, number, number][] = [];

  for (const line of lines) {
    const [xs, ys, zs] = line.split(",");
    points.push([Number(xs), Number(ys), Number(zs)]);
  }

  const points_distances: [number, number, number][] = [];

  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      points_distances.push([i, j, calculateDistance(points, i, j)]);
    }
  }

  points_distances.sort((a, b) => a[2] - b[2]);

  const [graph, first, final] = createGraph2(points, points_distances, 4536);

  return first[0] * final[0];
}
