import run from "aocrunner"

const parseInput = (rawInput) => rawInput

const part1 = (rawInput) => {
  const input = parseInput(rawInput)

  let sum = 0

  for (let line of input.split("\n")) {
    let [testValue, arr] = line.split(": ")
    testValue = parseInt(testValue)

    if (isValid(testValue, arr.split(" ").map(Number))) {
      sum += testValue
    }
  }

  return sum
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  let sum = 0

  for (let line of input.split("\n")) {
    let [testValue, arr] = line.split(": ")
    testValue = parseInt(testValue)

    if (isValid(testValue, arr.split(" ").map(Number), 0, 0, true)) {
      sum += testValue
    }
  }

  return sum
}

const isValid = (
  testValue,
  arr,
  index = 0,
  currentValue = 0,
  part2 = false,
) => {
  if (currentValue > testValue) return false

  if (index === arr.length) return currentValue === testValue

  let a = arr[index]

  index++

  return currentValue === 0
    ? isValid(testValue, arr, index, a, part2)
    : isValid(testValue, arr, index, currentValue + a, part2) ||
        isValid(testValue, arr, index, currentValue * a, part2) ||
        (part2 &&
          isValid(
            testValue,
            arr,
            index,
            parseInt(currentValue + "" + a),
            part2,
          ))
}

run({
  part1: {
    tests: [
      {
        input: `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`,
        expected: 3749,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`,
        expected: 11387,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
