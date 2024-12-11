import run from "aocrunner"

const parseInput = (rawInput) => rawInput

const memo = new Map()

const blinkStone = (stone, blinks) => {
  let res = memo.get(stone)

  if (res) return blink(res, blinks - 1)

  let stones =
    stone === "0"
      ? ["1"]
      : stone.length % 2 === 0
      ? [
          parseInt(stone.substring(0, stone.length / 2)).toString(),
          parseInt(stone.substring(stone.length / 2)).toString(),
        ]
      : [(parseInt(stone) * 2024).toString()]

  memo.set(stone, stones)

  return blink(stones, blinks - 1)
}

const blink = (stones, blinks) =>
  blinks === 0
    ? stones.length
    : stones.reduce((acc, stone) => {
        let key = `${stone}_${blinks}`,
          res = memo.get(key)

        if (!res) memo.set(key, (res = blinkStone(stone, blinks)))

        return acc + res
      }, 0)

const part1 = (rawInput) => blink(parseInput(rawInput).split(" "), 25)

const part2 = (rawInput) => blink(parseInput(rawInput).split(" "), 75)

run({
  part1: {
    tests: [
      {
        input: `125 17`,
        expected: 55312,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
