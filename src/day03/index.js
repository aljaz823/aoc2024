import run from "aocrunner"

const parseInput = (rawInput) => rawInput

const part1 = (rawInput) => {
  const input = parseInput(rawInput)

  const matches = input.matchAll(/mul\(([0-9]+),([0-9]+)\)/g)

  let sum = 0

  for (const match of matches) {
    sum += parseInt(match[1]) * parseInt(match[2])
  }

  return sum
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  const matches = input.matchAll(/do\(\)|don\'t\(\)|mul\(([0-9]+),([0-9]+)\)/g)

  let sum = 0,
    enabled = true

  for (const match of matches) {
    if (match[0] === "do()") {
      enabled = true
    } else if (match[0] === "don't()") {
      enabled = false
    } else if (enabled) {
      sum += parseInt(match[1]) * parseInt(match[2])
    }
  }

  return sum
}

run({
  part1: {
    tests: [
      {
        input: `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`,
        expected: 161,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`,
        expected: 48,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
