import run from "aocrunner"

const parseInput = (rawInput) => rawInput

const paint = (i, j, input, visitedMap) => {
  visitedMap[i][j] = true

  const el = input[i][j]

  // area, perimeter, sides
  let res = [1, 0, 0]

  // paint upwards
  if (i > 0 && visitedMap[i - 1][j] === false && input[i - 1][j] === el) {
    let up = paint(i - 1, j, input, visitedMap)
    res[0] = res[0] + up[0]
    res[1] = res[1] + up[1]
    res[2] = res[2] + up[2]
  }

  if (
    i + 1 < input.length &&
    visitedMap[i + 1][j] === false &&
    input[i + 1][j] === el
  ) {
    let down = paint(i + 1, j, input, visitedMap)
    res[0] = res[0] + down[0]
    res[1] = res[1] + down[1]
    res[2] = res[2] + down[2]
  }

  if (
    j + 1 < input[0].length &&
    visitedMap[i][j + 1] === false &&
    input[i][j + 1] === el
  ) {
    let right = paint(i, j + 1, input, visitedMap)
    res[0] = res[0] + right[0]
    res[1] = res[1] + right[1]
    res[2] = res[2] + right[2]
  }

  if (j > 0 && visitedMap[i][j - 1] === false && input[i][j - 1] === el) {
    let left = paint(i, j - 1, input, visitedMap)
    res[0] = res[0] + left[0]
    res[1] = res[1] + left[1]
    res[2] = res[2] + left[2]
  }

  let perimeter = 0,
    corners = 0

  let up = i > 0 ? input[i - 1][j] : undefined
  let down = i + 1 < input.length ? input[i + 1][j] : undefined
  let right = j + 1 < input[0].length ? input[i][j + 1] : undefined
  let left = j > 0 ? input[i][j - 1] : undefined

  if (up !== el && down !== el && right !== el && left !== el) corners = 4
  else if (up === el && down === el && left !== el && right !== el) corners = 0
  else if (left === el && right === el && up !== el && down !== el) corners = 0
  else if (up === el && left === el && down !== el && right !== el) {
    corners++
    if (input[i - 1][j - 1] !== el) corners++
  } else if (up === el && right === el && down !== el && left !== el) {
    corners++
    if (input[i - 1][j + 1] !== el) corners++
  } else if (down === el && right === el && left !== el && up !== el) {
    corners++
    if (input[i + 1][j + 1] !== el) corners++
  } else if (down === el && left === el && right !== el && up !== el) {
    corners++
    if (input[i + 1][j - 1] !== el) corners++
  } else if (down === el && up === el && right === el && left === el) {
    if (input[i - 1][j - 1] !== el) corners++
    if (input[i - 1][j + 1] !== el) corners++
    if (input[i + 1][j + 1] !== el) corners++
    if (input[i + 1][j - 1] !== el) corners++
  } else if (up === el && right === el && left === el) {
    if (input[i - 1][j - 1] !== el) corners++
    if (input[i - 1][j + 1] !== el) corners++
  } else if (down === el && right === el && left === el) {
    if (input[i + 1][j - 1] !== el) corners++
    if (input[i + 1][j + 1] !== el) corners++
  } else if (left === el && up === el && down === el) {
    if (input[i - 1][j - 1] !== el) corners++
    if (input[i + 1][j - 1] !== el) corners++
  } else if (right === el && up === el && down === el) {
    if (input[i - 1][j + 1] !== el) corners++
    if (input[i + 1][j + 1] !== el) corners++
  } else if (
    (right === el && up !== el && down !== el && left !== el) ||
    (left === el && up !== el && down !== el && right !== el) ||
    (up === el && right !== el && left !== el && down !== el) ||
    (down === el && right !== el && left !== el && up !== el)
  ) {
    corners += 2
  }

  if (i > 0 && input[i - 1][j] !== el) perimeter++
  if (j > 0 && input[i][j - 1] !== el) perimeter++
  if (i + 1 < input.length && input[i + 1][j] !== el) perimeter++
  if (j + 1 < input[0].length && input[i][j + 1] !== el) perimeter++
  if (i === 0 || i + 1 === input.length) perimeter++
  if (j === 0 || j + 1 === input[0].length) perimeter++

  res[1] = res[1] + perimeter
  res[2] = res[2] + corners

  return res
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
    .split("\n")
    .map((l) => l.split(""))

  const visitedMap = Array.from({ length: input.length }, () =>
    Array(input[0].length).fill(false),
  )

  let sum = 0

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
      let visited = visitedMap[i][j]
      if (visited) continue
      let res = paint(i, j, input, visitedMap)
      sum += res[0] * res[1]
    }
  }

  return sum
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)
    .split("\n")
    .map((l) => l.split(""))

  const visitedMap = Array.from({ length: input.length }, () =>
    Array(input[0].length).fill(false),
  )

  let sum = 0

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
      let visited = visitedMap[i][j]
      if (visited) continue
      let res = paint(i, j, input, visitedMap)
      sum += res[0] * res[2]
    }
  }

  return sum
}

run({
  part1: {
    tests: [
      {
        input: `AAAA
BBCD
BBCC
EEEC`,
        expected: 140,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `AAAA
BBCD
BBCC
EEEC`,
        expected: 80,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
