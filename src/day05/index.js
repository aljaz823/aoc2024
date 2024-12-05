import run from "aocrunner"

const parseInput = (rawInput) => rawInput

const part1 = (rawInput) => {
  const input = parseInput(rawInput).split("\n")

  let rules = new Map(),
    rulesObtained = false,
    sum = 0

  for (let i = 0; i < input.length; i++) {
    let line = input[i]

    if (line === "") {
      rulesObtained = true
    } else if (rulesObtained) {
      let pages = line.split(",").map(Number),
        valid = true

      for (let i = 0; i < pages.length - 1; i++) {
        const page = pages[i],
          nextPage = pages[i + 1],
          pageRules = rules.get(page),
          nextPageRules = rules.get(nextPage)

        if (pageRules?.after.has(nextPage) || nextPageRules?.before.has(page)) {
          valid = false
          break
        }
      }

      if (valid) {
        sum += pages[Math.floor(pages.length / 2)]
      }
    } else {
      let [a, b] = line.split("|").map(Number)

      if (!rules.has(a)) {
        rules.set(a, { before: new Set(), after: new Set() })
      }

      if (!rules.has(b)) {
        rules.set(b, { before: new Set(), after: new Set() })
      }

      rules.get(a).before.add(b)
      rules.get(b).after.add(a)
    }
  }

  return sum
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput).split("\n")

  let rules = new Map(),
    rulesObtained = false,
    sum = 0

  for (let i = 0; i < input.length; i++) {
    let line = input[i]

    if (line === "") {
      rulesObtained = true
    } else if (rulesObtained) {
      let pages = line.split(",").map(Number),
        valid = true

      for (let i = 0; i < pages.length - 1; i++) {
        const page = pages[i],
          nextPage = pages[i + 1],
          pageRules = rules.get(page),
          nextPageRules = rules.get(nextPage)

        if (pageRules?.after.has(nextPage) || nextPageRules?.before.has(page)) {
          valid = false

          pages[i] = nextPage
          pages[i + 1] = page

          i = i - 2
        }
      }

      if (!valid) {
        sum += pages[Math.floor(pages.length / 2)]
      }
    } else {
      let [a, b] = line.split("|").map(Number)

      if (!rules.has(a)) {
        rules.set(a, { before: new Set(), after: new Set() })
      }

      if (!rules.has(b)) {
        rules.set(b, { before: new Set(), after: new Set() })
      }

      rules.get(a).before.add(b)
      rules.get(b).after.add(a)
    }
  }

  return sum
}

run({
  part1: {
    tests: [
      {
        input: `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`,
        expected: 143,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`,
        expected: 123,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
