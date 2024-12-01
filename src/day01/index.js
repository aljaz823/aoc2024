import run from "aocrunner"

const parseInput = (rawInput) => rawInput

const part1 = (rawInput) => {
  const input = parseInput(rawInput)

  let arr1 = [],
    arr2 = []

  for (const line of input.split("\n")) {
    const [a, b] = line.split("   ").map((x) => parseInt(x))
    arr1.push(a)
    arr2.push(b)
  }

  arr1.sort((a, b) => a - b)
  arr2.sort((a, b) => a - b)

  let sum = 0

  for (let i = 0; i < arr1.length; i++) {
    sum += Math.abs(arr1[i] - arr2[i])
  }

  return sum
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  let arr1 = [],
    arr2 = []

  for (const line of input.split("\n")) {
    const [a, b] = line.split("   ").map((x) => parseInt(x))
    arr1.push(a)
    arr2.push(b)
  }

  let sum = 0

  for (const el of arr1) {
    sum += el * arr2.reduce((acc, cur) => acc + (el === cur), 0)
  }

  return sum
}

run({
  part1: {
    tests: [
      {
        input: `3   4
4   3
2   5
1   3
3   9
3   3`,
        expected: 11,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `3   4
4   3
2   5
1   3
3   9
3   3`,
        expected: 31,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
