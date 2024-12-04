import run from "aocrunner"

const parseInput = (rawInput) => rawInput

const part1 = (rawInput) => {
  const input = parseInput(rawInput)

  let arr = input.split("\n").map((row) => row.split(""))
  let rowLength = arr[0].length

  let count = 0

  for (let y = 0; y < arr.length; y++) {
    for (let x = 0; x < rowLength; x++) {
      if (arr[y][x] !== "X") continue

      // check right
      if (
        x < rowLength - 3 &&
        arr[y][x + 1] === "M" &&
        arr[y][x + 2] === "A" &&
        arr[y][x + 3] === "S"
      ) {
        count++
      }

      // check left
      if (
        x > 2 &&
        arr[y][x - 1] === "M" &&
        arr[y][x - 2] === "A" &&
        arr[y][x - 3] === "S"
      ) {
        count++
      }

      // check down
      if (
        y < arr.length - 3 &&
        arr[y + 1][x] === "M" &&
        arr[y + 2][x] === "A" &&
        arr[y + 3][x] === "S"
      ) {
        count++
      }

      // check up
      if (
        y > 2 &&
        arr[y - 1][x] === "M" &&
        arr[y - 2][x] === "A" &&
        arr[y - 3][x] === "S"
      ) {
        count++
      }

      // check diagonally down right
      if (
        x < rowLength - 3 &&
        y < arr.length - 3 &&
        arr[y + 1][x + 1] === "M" &&
        arr[y + 2][x + 2] === "A" &&
        arr[y + 3][x + 3] === "S"
      ) {
        count++
      }

      // check diagonally down left
      if (
        x > 2 &&
        y < arr.length - 3 &&
        arr[y + 1][x - 1] === "M" &&
        arr[y + 2][x - 2] === "A" &&
        arr[y + 3][x - 3] === "S"
      ) {
        count++
      }

      // check diagonally up right
      if (
        x < rowLength - 3 &&
        y > 2 &&
        arr[y - 1][x + 1] === "M" &&
        arr[y - 2][x + 2] === "A" &&
        arr[y - 3][x + 3] === "S"
      ) {
        count++
      }

      // check diagonally up left
      if (
        x > 2 &&
        y > 2 &&
        arr[y - 1][x - 1] === "M" &&
        arr[y - 2][x - 2] === "A" &&
        arr[y - 3][x - 3] === "S"
      ) {
        count++
      }
    }
  }

  return count
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  let arr = input.split("\n").map((row) => row.split(""))
  let rowLength = arr[0].length

  let count = 0

  for (let y = 0; y < arr.length - 1; y++) {
    for (let x = 0; x < rowLength - 1; x++) {
      if (arr[y][x] !== "A" || x < 1 || y < 1) continue

      let upleft = arr[y - 1][x - 1],
        upright = arr[y - 1][x + 1],
        downleft = arr[y + 1][x - 1],
        downright = arr[y + 1][x + 1]

      if (
        ((upleft === "M" && downright === "S") ||
          (upleft === "S" && downright === "M")) &&
        ((upright === "M" && downleft === "S") ||
          (upright === "S" && downleft === "M"))
      ) {
        count++
      }
    }
  }

  return count
}

run({
  part1: {
    tests: [
      {
        input: `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`,
        expected: 18,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`,
        expected: 9,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
