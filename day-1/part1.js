const { testCases, testString, testResult } = require("./src/part1-test-cases");
const { data1 } = require("./src/part1-data");

function findCalibrationValue(string) {
  function findFarLeft(str) {
    const candidate = parseInt(str[0]);
    return isNaN(candidate) ? findFarLeft(str.slice(1)) : candidate;
  }

  function findFarRight(str) {
    const candidate = parseInt(str.slice(-1));
    return isNaN(candidate)
      ? findFarRight(str.slice(0, str.length - 1))
      : candidate;
  }

  const n1 = findFarLeft(string);
  const n2 = findFarRight(string);

  return parseInt(`${n1}${n2}`);
}

function cumulateCalibrationValues(calibrationDocument) {
  const sum = calibrationDocument
    .split("\n")
    .reduce((sum, line) => sum + findCalibrationValue(line), 0);
  return sum;
}

// Test result
// const testResult = cumulateCalibrationValues(testString);
// console.log(testResult);
const result = cumulateCalibrationValues(data1);
console.log(result);
