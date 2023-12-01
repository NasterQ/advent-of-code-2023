const { data2 } = require("./src/part2-data");
const { testData } = require("./src/part2-test-data");

const test1 = "asaonetwothree4fivesixonetwoone";
const test2 = "onethreeonetwo";
const test3 = "sxbjdbtlnjrmlzgxneightthreepmqxdxhfk8jfrheightwovp";

const literals = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

function adjustCalibration(text) {
  const numbers = Object.entries(literals).flatMap((n) => n); // Create an array of looked symbols

  const translateLiteral = (literal) =>
    typeof literal === "string" ? literals[literal] : literal;

  function findNumbers(string) {
    /**
     * Finds last number from provided list of found numbers.
     * @param {{ literal: number, index: number }[]} listOfNums List of found numbers
     * @param {{ literal: number, index: number }} candidate number with the highest index so far
     * @return {{ literal: number, index: number }} Number with the highest index (the last number)
     */
    function findLastNumber(listOfNums, candidate = null) {
      if (listOfNums.length === 1) return listOfNums[0];
      if (listOfNums.length === 0) return candidate;

      // Find new candidate
      const currentCandidate = listOfNums.reduce((max, curr) =>
        curr.index > max.index ? curr : max
      );

      // If all literals were found - return the last one
      if (listOfNums.length === 0)
        return currentCandidate.index > candidate.index
          ? currentCandidate
          : candidate;

      const currentListOfNums = listOfNums
        .map((symbol) => ({
          literal: symbol.literal,
          index: string.indexOf(symbol.literal, symbol.index + 1),
        }))
        .filter((symbol) => symbol.index !== -1);

      return findLastNumber(
        [...currentListOfNums, currentCandidate],
        currentCandidate
      );
    }

    // Find numbers that occur in the word
    const foundNumbers = Array.from(
      numbers
        .map((symbol) => ({ literal: symbol, index: string.indexOf(symbol) }))
        .filter((symbol) => symbol.index !== -1)
    );

    // Find number with the smallest index
    const firstNumLiteral = foundNumbers.reduce((min, curr) =>
      curr.index < min.index ? curr : min
    ).literal;

    const lastNumLiteral = findLastNumber(foundNumbers).literal;

    const firstNum = translateLiteral(firstNumLiteral);
    const lastNum = translateLiteral(lastNumLiteral);

    const finalNumber = parseInt(`${firstNum}${lastNum}`);

    return finalNumber;
  }

  const lines = text.split("\n");
  const sum = lines.reduce((sum, line) => sum + findNumbers(line), 0);
  return sum;
}

// const testResult = adjustCalibration(test2);
// console.log(testResult);

const result = adjustCalibration(data2);
console.log(result);
