import run from "aocrunner"
import { log } from "console"

const parseInput = (rawInput) => rawInput

const part1 = (rawInput) => {
  const input = parseInput(rawInput)

  const arr = Array.from({ length: 103 }, () => Array(101).fill(0)),
    xlen = arr[0].length,
    ylen = arr.length,
    seconds = 0

  for (let robot of input.split("\n")) {
    let sp = robot.split(" "),
      p = sp[0].split(","),
      x = parseInt(p[0].substring(2)),
      y = parseInt(p[1]),
      v = sp[1].split(","),
      vx = parseInt(v[0].substring(2)),
      vy = parseInt(v[1])

    if (vx < 0) vx += xlen
    if (vy < 0) vy += ylen

    let posy = (vy * seconds + y) % ylen
    let posx = (vx * seconds + x) % xlen

    arr[posy][posx] = arr[posy][posx] + 1
  }

  let q1 = 0,
    q2 = 0,
    q3 = 0,
    q4 = 0

  for (let i = 0; i < ylen; i++) {
    for (let j = 0; j < xlen; j++) {
      if (arr[i][j] === 0) continue

      if (i < Math.floor(ylen / 2) && j < Math.floor(xlen / 2)) q1 += arr[i][j]
      else if (i < Math.floor(ylen / 2) && j > Math.floor(xlen / 2))
        q2 += arr[i][j]
      else if (i > Math.floor(ylen / 2) && j < Math.floor(xlen / 2))
        q3 += arr[i][j]
      else if (i > Math.floor(ylen / 2) && j > Math.floor(xlen / 2))
        q4 += arr[i][j]
    }
  }

  return q1 * q2 * q3 * q4
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  let arr = Array.from({ length: 103 }, () => Array(101).fill(0)),
    xlen = arr[0].length,
    ylen = arr.length,
    seconds = 0,
    robotsLength = input.split("\n").length

  while (true) {
    for (let robot of input.split("\n")) {
      let sp = robot.split(" "),
        p = sp[0].split(","),
        x = parseInt(p[0].substring(2)),
        y = parseInt(p[1]),
        v = sp[1].split(","),
        vx = parseInt(v[0].substring(2)),
        vy = parseInt(v[1])

      if (vx < 0) vx += xlen
      if (vy < 0) vy += ylen

      let posy = (vy * seconds + y) % ylen
      let posx = (vx * seconds + x) % xlen

      arr[posy][posx] = arr[posy][posx] + 1
    }

    let sumOfUnique = 0
    for (let i = 0; i < ylen; i++) {
      for (let j = 0; j < xlen; j++) {
        if (arr[i][j] === 1) sumOfUnique++
      }
    }

    if (sumOfUnique === robotsLength) return seconds

    arr = Array.from({ length: 103 }, () => Array(101).fill(0))
    seconds++
  }

  return seconds
}

run({
  part1: {
    tests: [
      {
        input: `p=0,4 v=3,-3
p=6,3 v=-1,-3
p=10,3 v=-1,2
p=2,0 v=2,-1
p=0,0 v=1,3
p=3,0 v=-2,-2
p=7,6 v=-1,-3
p=3,0 v=-1,-2
p=9,3 v=2,3
p=7,3 v=-1,2
p=2,4 v=2,-3
p=9,5 v=-3,-3`,
        expected: 12,
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
