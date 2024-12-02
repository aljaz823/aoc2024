import run from "aocrunner"

const parseInput = (rawInput) => rawInput

const part1 = (rawInput) => {
  const input = parseInput(rawInput)

  let safeCount = 0

  for (const line of input.split("\n")) {
    let lineSp = line.split(" ").map(Number)

    safeCount += isSafe(lineSp) ? 1 : 0
  }

  return safeCount
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  let safeCount = 0

  for (const line of input.split("\n")) {
    let lineSp = line.split(" ").map(Number)

    safeCount += isSafe(lineSp, undefined, true) ? 1 : 0
  }

  return safeCount
}

const isSafe = (lineSp, decreasing, v2) => {
  let length = lineSp.length

  let i = 1

  while (i < length) {
    let diff = lineSp[i] - lineSp[i - 1]

    if (
      Math.abs(diff) > 3 ||
      diff === 0 ||
      (diff < 0 && decreasing === false) ||
      (diff > 0 && decreasing === true)
    ) {
      if (v2) {
        let arr = [...lineSp],
          arr2 = [...lineSp],
          arr3 = [...lineSp]

        arr.splice(i, 1)
        arr2.splice(i - 1, 1)
        i > 1 && arr3.splice(i - 2, 1)

        return isSafe(arr) || isSafe(arr2) || (i > 1 && isSafe(arr3))
      }

      return false
    }

    decreasing = diff < 0
    i++
  }

  return true
}

run({
  part1: {
    tests: [
      {
        input: `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `1 3 2 1`,
        expected: 1,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
