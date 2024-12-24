import run from "aocrunner"

const parseInput = (rawInput) => rawInput

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
    .split("\n\n")
    .map((el) => el.split("\n"))

  let sum = 0

  for (let machine of input) {
    let abutton = machine[0].split(", "),
      ax = parseInt(abutton[0].substring(12)),
      ay = parseInt(abutton[1].substring(2)),
      bbutton = machine[1].split(", "),
      bx = parseInt(bbutton[0].substring(12)),
      by = parseInt(bbutton[1].substring(2)),
      prize = machine[2].split(", "),
      prizex = parseInt(prize[0].substring(9)),
      prizey = parseInt(prize[1].substring(2)),
      f1 = ay * bx,
      f2 = by * ax,
      f3 = f1 - f2,
      s1 = (prizey * bx - by * prizex) / f3

    if (s1 % 1 !== 0) continue

    let s2 = (prizex - ax * s1) / bx

    if (s2 % 1 !== 0) continue

    sum += s1 * 3 + s2
  }

  return sum
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)
    .split("\n\n")
    .map((el) => el.split("\n"))

  let sum = 0

  for (let machine of input) {
    let abutton = machine[0].split(", "),
      ax = parseInt(abutton[0].substring(12)),
      ay = parseInt(abutton[1].substring(2)),
      bbutton = machine[1].split(", "),
      bx = parseInt(bbutton[0].substring(12)),
      by = parseInt(bbutton[1].substring(2)),
      prize = machine[2].split(", "),
      prizex = parseInt(prize[0].substring(9)) + 10000000000000,
      prizey = parseInt(prize[1].substring(2)) + 10000000000000,
      f1 = ay * bx,
      f2 = by * ax,
      f3 = f1 - f2,
      s1 = (prizey * bx - by * prizex) / f3

    if (s1 % 1 !== 0) continue

    let s2 = (prizex - ax * s1) / bx

    if (s2 % 1 !== 0) continue

    sum += s1 * 3 + s2
  }

  return sum
}

run({
  part1: {
    tests: [
      {
        input: `Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279`,
        expected: 480,
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
