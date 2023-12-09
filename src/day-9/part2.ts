// import { testData1 as data } from './data/part1-test-data';
import { data1 as data } from './data/part1-data';

function analise(inputData: number[]): number {
  const pyramid = (currData: number[], allData: number[][]): number[][] => {
    if (currData.every((num: number) => num === 0)) return allData;
    const rowCreator = (currValues: number[] = [], index: number = 1): number[] => {
      if (currData.length === index) return currValues;
      const rowEntry: number = currData[index] - currData[index - 1];
      return rowCreator([...currValues, rowEntry], index + 1);
    };

    const row: number[] = rowCreator();

    return pyramid(row, [...allData, row]);
  };

  const unwindPyramid = (
    pyramidData: number[][],
    indexData: number,
    indexNewData: number,
    currPyramindData: number[][]
  ): number[][] => {
    if (indexData === 0) return currPyramindData;
    const lastRow: number[] = currPyramindData[indexNewData];
    const lastValue: number = lastRow[lastRow.length - 1];
    const penLastRow: number[] = pyramidData[indexData - 1];
    const penLastValue: number = penLastRow[penLastRow.length - 1];

    return unwindPyramid(pyramidData, indexData - 1, indexNewData + 1, [
      ...currPyramindData,
      [...penLastRow, penLastValue - lastValue]
    ]);
  };

  const pyramidStructure: number[][] = pyramid(inputData, [inputData]).map((row: number[]) => row.toReversed());
  const historyStructure: number[][] = unwindPyramid(pyramidStructure, pyramidStructure.length - 1, 0, [
    pyramidStructure[pyramidStructure.length - 1]
  ]);

  return historyStructure[historyStructure.length - 1][historyStructure[historyStructure.length - 1].length - 1];
}

const splitData: number[][] = data.split('\n').map((row: string) => row.split(' ').map((symbol: string) => +symbol));
const hitoryValues: number[] = splitData.map((row: number[]) => analise(row));
const summedHistoryValues: number = hitoryValues.reduce((sum: number, val: number) => sum + val, 0);
console.log(summedHistoryValues);
