import run from "aocrunner"
import { log } from "console"

const parseInput = (rawInput) => rawInput

const moves = {
  "^": { y: -1, x: 0 },
  v: { y: 1, x: 0 },
  ">": { y: 0, x: 1 },
  "<": { y: 0, x: -1 },
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput)

  let pos

  let map = input.split("\n").map((line, i) => {
    let lineSplitted = line.split("")
    let startingPositionMatch = line.match(/\^|\>|\<|\v/g)
    if (startingPositionMatch)
      pos = { y: i, x: line.indexOf(startingPositionMatch[0]) }
    return lineSplitted
  })

  let count = 1
  let currentDirection = map[pos.y][pos.x]

  while (true) {
    if (map[pos.y][pos.x] === ".") {
      count++
      map[pos.y][pos.x] = "X"
    }

    let nextPos = {
      y: pos.y + moves[currentDirection].y,
      x: pos.x + moves[currentDirection].x,
    }

    if (
      nextPos.y < 0 ||
      nextPos.y >= map.length ||
      nextPos.x < 0 ||
      nextPos.x >= map[0].length
    ) {
      break
    }

    if (map[nextPos.y][nextPos.x] === "#") {
      currentDirection =
        currentDirection === "^"
          ? ">"
          : currentDirection === ">"
          ? "v"
          : currentDirection === "v"
          ? "<"
          : "^"
    } else {
      pos = nextPos
    }
  }

  return count
}

const validMoves = {
  "<": "^",
  "^": ">",
  ">": "v",
  v: "<",
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  let pos

  let map = input.split("\n").map((line, i) => {
    let lineSplitted = line.split("")
    let startingPositionMatch = line.match(/\^|\>|\<|\v/g)
    if (startingPositionMatch)
      pos = { y: i, x: line.indexOf(startingPositionMatch[0]) }
    return lineSplitted.map((el) => [el, []])
  })

  let currentDirection = map[pos.y][pos.x][0]
  map[pos.y][pos.x][0] = "."

  let obstacleCount = 0

  while (true) {
    let nextPos = {
      y: pos.y + moves[currentDirection].y,
      x: pos.x + moves[currentDirection].x,
    }

    if (
      nextPos.x < 0 ||
      nextPos.x >= map[0].length ||
      nextPos.y < 0 ||
      nextPos.y >= map.length
    ) {
      break
    }

    if (map[nextPos.y][nextPos.x][0] === "#") {
      // change direction
      currentDirection = validMoves[currentDirection]
    } else {
      // try to place an obstacle and see if it makes a loop
      if (map[nextPos.y][nextPos.x][0] === ".") {
        let newMapWithObstacle = JSON.parse(JSON.stringify(map))
        newMapWithObstacle[nextPos.y][nextPos.x][0] = "#"
        obstacleCount += makesALoop(
          newMapWithObstacle,
          pos,
          validMoves[currentDirection],
        )
      }

      // continue with your normal loop
      map[pos.y][pos.x][0] = currentDirection
      map[pos.y][pos.x][1].push(currentDirection)
      pos = nextPos
    }
  }

  return obstacleCount
}

const makesALoop = (map, pos, currentDirection) => {
  while (true) {
    let nextPos = {
      y: pos.y + moves[currentDirection].y,
      x: pos.x + moves[currentDirection].x,
    }

    if (
      nextPos.y < 0 ||
      nextPos.y >= map.length ||
      nextPos.x < 0 ||
      nextPos.x >= map[0].length
    ) {
      return false
    }

    if (map[nextPos.y][nextPos.x][0] === "#") {
      currentDirection = validMoves[currentDirection]
    } else {
      if (map[pos.y][pos.x][1].includes(currentDirection)) {
        return true
      }
      map[pos.y][pos.x][1].push(currentDirection)
      pos = nextPos
    }
  }
}

run({
  part1: {
    tests: [
      {
        input: `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`,
        expected: 41,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`,
        expected: 6,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
