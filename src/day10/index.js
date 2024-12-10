import run from "aocrunner"

const parseInput = (rawInput) => rawInput

const score = (i, j, map, scores, part2 = false) => {
  let v = map[i][j]

  if (v === 9) scores[i][j] = [`${i}_${j}`]

  if (scores[i][j]?.length > 0) return scores[i][j]

  let scoreUp =
      i > 0 && map[i - 1][j] === v + 1
        ? score(i - 1, j, map, scores, part2)
        : [],
    scoreDown =
      i < map.length - 1 && map[i + 1][j] === v + 1
        ? score(i + 1, j, map, scores, part2)
        : [],
    scoreRight =
      j < map[0].length && map[i][j + 1] === v + 1
        ? score(i, j + 1, map, scores, part2)
        : [],
    scoreLeft =
      j > 0 && map[i][j - 1] === v + 1
        ? score(i, j - 1, map, scores, part2)
        : []

  scores[i][j] = [...scoreUp, ...scoreDown, ...scoreLeft, ...scoreRight]

  if (!part2) scores[i][j] = [...new Set(scores[i][j])]

  return scores[i][j]
}

const part1 = (rawInput) => {
  const m = parseInput(rawInput)
    .split("\n")
    .map((line) => line.split("").map(Number))

  const scores = Array.from({ length: m.length }, () => Array(m[0].length))

  let sum = 0

  for (let i = 0; i < m.length; i++) {
    for (let j = 0; j < m[0].length; j++) {
      if (m[i][j] === 0) sum += score(i, j, m, scores).length
    }
  }

  return sum
}

const part2 = (rawInput) => {
  const m = parseInput(rawInput)
    .split("\n")
    .map((line) => line.split("").map(Number))

  const scores = Array.from({ length: m.length }, () => Array(m[0].length))

  let sum = 0

  for (let i = 0; i < m.length; i++) {
    for (let j = 0; j < m[0].length; j++) {
      if (m[i][j] === 0) sum += score(i, j, m, scores, true).length
    }
  }

  return sum
}

run({
  part1: {
    tests: [
      {
        input: `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`,
        expected: 36,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`,
        expected: 81,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
