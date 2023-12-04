import { testData1 as data } from './data/part1-test-data';

const createEngineArray = (textData: string): string[][] => textData.split('\n').map((row: string) => Array.from(row));
const findSymbolsIndexes = (matrixData: string[][], omitRegex: RegExp): [number, number][][] =>
  matrixData.map((row: string[], y: number): [number, number][] =>
    row.reduce(
      (indexes: [number, number][], currSymbol: string, x: number): [number, number][] =>
        omitRegex.test(currSymbol) ? indexes : [...indexes, [x, y]],
      []
    )
  );

const findNumbersAndCorrespondingIndexes = (matrixData: string[][]) => {
  const numberContinuity = (numCoords1: [number, number], numCoords2: [number, number]): boolean =>
    numCoords1[0] + 1 === numCoords2[0];

  const getXvalues = (row: [number, number][]): number[] => row.map((coords: [number, number]) => coords[1]);

  const assembleNumbersAndIndexes = (numbersCoordinates: [number, number][][]) =>
    numbersCoordinates.map((row: [number, number][]) => {});

  //       row.reduce((acc, currCoords) => numberContinuity(acc[acc.length - 1], currCoords) ? [], [])

  const numbersIndexes: [number, number][][] = findSymbolsIndexes(engineArray, /[^0-9]/);

  console.log(getXvalues(numbersIndexes));
};

const engineArray: string[][] = createEngineArray(data);
const symbolsIndexes: [number, number][][] = findSymbolsIndexes(engineArray, /[0-9]|\./);
findNumbersAndCorrespondingIndexes(engineArray);
