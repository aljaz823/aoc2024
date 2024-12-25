import run from "aocrunner"

const parseInput = (rawInput) => rawInput

const moves = {
  v: { i: 1, j: 0 },
  "^": { i: -1, j: 0 },
  ">": { i: 0, j: 1 },
  "<": { i: 0, j: -1 },
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput).split("\n")

  let map = [],
    parseCommands = false,
    cmds = "",
    pos

  for (let line of input) {
    if (!line) parseCommands = true
    else if (!parseCommands) {
      let newline = [...line.split("")]
      if (newline.includes("@")) {
        pos = { i: map.length, j: newline.indexOf("@") }
      }
      map.push(newline)
    } else {
      cmds = cmds + line
    }
  }

  for (let cmd of cmds) pos = move(pos, cmd, map) ?? pos

  return map.reduce(
    (acc, line, i) =>
      acc +
      line.reduce((acc2, el, j) => acc2 + (el === "O" ? 100 * i + j : 0), 0),
    0,
  )
}

const move = (pos, cmd, map) => {
  let nextPos = { i: pos.i + moves[cmd].i, j: pos.j + moves[cmd].j }

  if (map[nextPos.i][nextPos.j] === "#") {
    return undefined
  }

  if (map[nextPos.i][nextPos.j] === ".") {
    map[nextPos.i][nextPos.j] = map[pos.i][pos.j]
    map[pos.i][pos.j] = "."
    return nextPos
  } else if (map[nextPos.i][nextPos.j] === "O") {
    let success = move(nextPos, cmd, map)
    if (success) {
      map[nextPos.i][nextPos.j] = map[pos.i][pos.j]
      map[pos.i][pos.j] = "."
      return nextPos
    } else return undefined
  }
}

const move2 = (pos, cmd, map) => {
  let nextPos = { i: pos.i + moves[cmd].i, j: pos.j + moves[cmd].j }

  if (map[nextPos.i][nextPos.j] === "#") {
    return undefined
  }

  if (map[nextPos.i][nextPos.j] === ".") {
    map[nextPos.i][nextPos.j] = map[pos.i][pos.j]
    map[pos.i][pos.j] = "."
    return nextPos
  } else if (["[", "]"].includes(map[nextPos.i][nextPos.j])) {
    if ([">", "<"].includes(cmd)) {
      let success = move2(nextPos, cmd, map)
      if (success) {
        map[nextPos.i][nextPos.j] = map[pos.i][pos.j]
        map[pos.i][pos.j] = "."
        return nextPos
      } else {
        return undefined
      }
    } else {
      let lookLeft = map[nextPos.i][nextPos.j] === "]",
        success1 = move2(nextPos, cmd, map),
        nextPos2 = {
          i: nextPos.i,
          j: nextPos.j + (lookLeft ? -1 : 1),
        },
        success2 = move2(nextPos2, cmd, map)

      if (success1 && success2) {
        map[nextPos.i][nextPos.j] = map[pos.i][pos.j]
        map[pos.i][pos.j] = "."
        map[nextPos2.i][nextPos2.j] = "."

        return nextPos
      } else {
        return undefined
      }
    }
  }
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput).split("\n")

  let map = [],
    parseCommands = false,
    cmds = "",
    pos

  for (let line of input) {
    if (!line) parseCommands = true
    else if (!parseCommands) {
      let newline = [],
        chars = line.split("")

      for (let i = 0; i < chars.length; i++) {
        let char = chars[i]

        if (char === "#") newline.push(...["#", "#"])
        else if (char === "O") newline.push(...["[", "]"])
        else if (char === ".") newline.push(...[".", "."])
        else if (char === "@") {
          newline.push(...["@", "."])
          pos = { i: map.length, j: newline.indexOf("@") }
        }
      }
      map.push(newline)
    } else {
      cmds = cmds + line
    }
  }
  for (let cmd of cmds) {
    let backupMap = JSON.parse(JSON.stringify(map))
    let success = move2(pos, cmd, map)
    if (!success) map = backupMap
    pos = success ?? pos
  }

  return map.reduce(
    (acc, line, i) =>
      acc +
      line.reduce((acc2, el, j) => acc2 + (el === "[" ? 100 * i + j : 0), 0),
    0,
  )
}

run({
  part1: {
    tests: [
      {
        input: `########
#..O.O.#
##@.O..#
#...O..#
#.#.O..#
#...O..#
#......#
########

<^^>>>vv<v>>v<<`,
        expected: 2028,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `##########
#..O..O.O#
#......O.#
#.OO..O.O#
#..O@..O.#
#O#..O...#
#O..O..O.#
#.OO.O.OO#
#....O...#
##########

<vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^
vvv<<^>^v^^><<>>><>^<<><^vv^^<>vvv<>><^^v>^>vv<>v<<<<v<^v>^<^^>>>^<v<v
><>vv>v^v^<>><>>>><^^>vv>v<^^^>>v^v^<^^>v^^>v^<^v>v<>>v^v^<v>v^^<^^vv<
<<v<^>>^^^^>>>v^<>vvv^><v<<<>^^^vv^<vvv>^>v<^^^^v<>^>vvvv><>>v^<<^^^^^
^><^><>>><>^^<<^^v>>><^<v>^<vv>>v>>>^v><>^v><<<<v>>v<v<v>vvv>^<><<>^><
^>><>^v<><^vvv<^^<><v<<<<<><^v<<<><<<^^<v<^^^><^>>^<v^><<<^>>^v<v^v<v^
>^>>^v>vv>^<<^v<>><<><<v<<v><>v<^vv<<<>^^v^>^^>>><<^v>>v^v><^^>>^<>vv^
<><^^>^^^<><vvvvv^v<v<<>^v<v>v<<^><<><<><<<^^<<<^<<>><<><^^^>^^<>^>v<>
^^>vv<^v^v<vv>^<><v<^v>^^^>>>^^vvv^>vvv<>>>^<^>>>>>^<<^v>^vvv<>^<><<v>
v^^>>><<^^<>>^v^<v^vv<>v^<<>^<^v^v><^<<<><<^<v><v<>vv>>v><v^<vv<>v^<<^`,
        expected: 9021,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
