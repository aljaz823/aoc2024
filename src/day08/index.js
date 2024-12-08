import run from "aocrunner"

const parseInput = (rawInput) => rawInput

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
    .split("\n")
    .map((line) => line.split(""))

  let antennas = {}

  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      let antenna = input[y][x]
      if (antenna !== ".") {
        if (!(antenna in antennas)) {
          antennas[antenna] = []
        }
        antennas[antenna].push({ y, x })
      }
    }
  }

  let antinodes = []

  for (const locations of Object.values(antennas)) {
    for (let i = 0; i < locations.length - 1; i++) {
      let a = locations[i]
      for (let j = i + 1; j < locations.length; j++) {
        let b = locations[j]

        antinodes.push(
          ...getAntinodeLocations(a, b, input.length, input[0].length),
        )
      }
    }
  }

  return new Set(antinodes).size
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)
    .split("\n")
    .map((line) => line.split(""))

  let antennas = {}

  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      let antenna = input[y][x]
      if (antenna !== ".") {
        if (!(antenna in antennas)) {
          antennas[antenna] = []
        }
        antennas[antenna].push({ y, x })
      }
    }
  }

  let antinodes = []

  for (const locations of Object.values(antennas)) {
    for (let i = 0; i < locations.length - 1; i++) {
      let a = locations[i]
      for (let j = i + 1; j < locations.length; j++) {
        let b = locations[j]

        antinodes.push(
          ...getAntinodeLocations(a, b, input.length, input[0].length, true),
        )
      }
    }
  }

  return new Set(antinodes).size
}

const getKey = (a) => {
  return a.x + "_" + a.y
}

const getAntinodeLocations = (a, b, maxY, maxX, part2) => {
  let v = { x: b.x - a.x, y: b.y - a.y }

  let c1 = { x: a.x + 2 * v.x, y: a.y + 2 * v.y }
  let c2 = { x: a.x - v.x, y: a.y - v.y }

  let antinodes = []

  if (part2) antinodes = [getKey(a), getKey(b)]

  while (c1.x >= 0 && c1.x < maxX && c1.y >= 0 && c1.y < maxY) {
    antinodes.push(getKey(c1))

    if (!part2) break

    c1 = { x: c1.x + v.x, y: c1.y + v.y }
  }

  while (c2.x >= 0 && c2.x < maxX && c2.y >= 0 && c2.y < maxY) {
    antinodes.push(getKey(c2))

    if (!part2) break

    c2 = { x: c2.x - v.x, y: c2.y - v.y }
  }

  return antinodes
}

run({
  part1: {
    tests: [
      {
        input: `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`,
        expected: 14,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`,
        expected: 34,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
