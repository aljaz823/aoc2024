import run from "aocrunner"
import { log } from "console"

const parseInput = (rawInput) => rawInput

const part1 = (rawInput) => {
  let id = 0,
    s = parseInput(rawInput)
      .split("")
      .map(Number)
      .reduce((acc, currentValue, i) => {
        acc.push(...Array(currentValue).fill(i % 2 === 1 ? "." : id))
        i % 2 === 0 && id++
        return acc
      }, [])

  let i = s.length - 1

  while (s.slice(0, i).includes(".")) {
    if (s[i] !== ".") {
      s[s.findIndex((el) => el === ".")] = s[i]
      s[i] = "."
    }

    i--
  }

  return s.reduce((acc, currentValue, i) => {
    if (currentValue === ".") return acc
    return acc + i * currentValue
  }, 0)
}

const part2 = (rawInput) => {
  let id = -1,
    freeSpaces = [],
    s = parseInput(rawInput)
      .split("")
      .map(Number)
      .reduce((acc, currentValue, i) => {
        i % 2 === 0 && id++
        if (i % 2 === 1 && currentValue > 0) {
          freeSpaces.push({
            start: acc.length,
            end: acc.length + currentValue - 1,
            len: currentValue,
          })
        }
        acc.push(...Array(currentValue).fill(i % 2 === 1 ? "." : id))
        return acc
      }, [])

  while (id > 0) {
    let a = s.findIndex((el) => el === id),
      b = s.findLastIndex((el) => el === id),
      len = b - a + 1,
      freeSpace = freeSpaces.find((el) => el.len >= len && el.end < a)

    if (freeSpace) {
      Array.prototype.splice.apply(s, [
        freeSpace.start,
        len,
        ...Array(len).fill(id),
      ])
      Array.prototype.splice.apply(s, [a, len, ...Array(len).fill(".")])
      freeSpace.len -= len
      freeSpace.start += len
    }

    id--
  }

  return s.reduce((acc, currentValue, i) => {
    if (currentValue === ".") return acc
    return acc + i * currentValue
  }, 0)
}

run({
  part1: {
    tests: [
      {
        input: `2333133121414131402`,
        expected: 1928,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `2333133121414131402`,
        expected: 2858,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
