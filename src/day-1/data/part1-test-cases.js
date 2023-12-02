const testCases = [
  {
    input: "1abc2",
    output: 12
  },
  {
    input: "pqr3stu8vwx",
    output: 38,
  },
  {
    input: "a1b2c3d4e5f",
    output: 15,
  },
  {
    input: "treb7uchet",
    output: 77,
  },
];

const testString = testCases.reduce((acc, curr, i) => (testCases.length === i + 1) ? `${acc}${curr.input}` : `${acc}${curr.input}\n`, "");
const testResult = testCases.reduce((acc, curr) => acc + curr.output, 0);

exports.testCases = testCases;
exports.testString = testString;
exports.testResult = testResult;
