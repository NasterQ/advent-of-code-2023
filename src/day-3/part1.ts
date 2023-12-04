import { testData1 as data } from './data/part1-test-data';

const createEngineArray = (textData: string): string[][] => textData.split('\n').map((row: string) => Array.from(row));
const findSymbolsIndexes = (matrixData: string[][]): [number, number][][] =>
  matrixData.map((row: string[], y: number): [number, number][] =>
    row.reduce(
      (indexes: [number, number][], currSymbol: string, x: number): [number, number][] =>
        /[0-9]|\./.test(currSymbol) ? indexes : [...indexes, [x, y]],
      []
    )
  );

const engineArray: string[][] = createEngineArray(data);

console.log(findSymbolsIndexes(engineArray));
