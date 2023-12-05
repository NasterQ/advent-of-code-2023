import { testData1 as data } from './data/part1-test-data';
type TCoords = [number, number];

interface IndexedSymbol {
  symbol: string;
  index: number;
}

interface SymbolsList {
  row: number;
  symbols: IndexedSymbol[];
}

const splitData = (textData: string): string[] => textData.split('\n');
const createEngineArray = (textData: string[]): string[][] => textData.map((row: string) => Array.from(row));
const findSymbolsIndexes = (matrixData: string[][], omitRegex: RegExp): TCoords[][] =>
  matrixData.map((row: string[], y: number): TCoords[] =>
    row.reduce(
      (indexes: TCoords[], currSymbol: string, x: number): TCoords[] =>
        omitRegex.test(currSymbol) ? indexes : [...indexes, [x, y]],
      []
    )
  );

const findNumbersAndCorrespondingIndexes = (matrixData: string[][]) => {
  const numberContinuity = (accCoords1: number[], numCoords2: number): boolean =>
    accCoords1[accCoords1.length - 1] + 1 === numCoords2;

  const getXvalues = (row: TCoords[]): number[] => row.map((coords: TCoords) => coords[0]);

  const assembleNumbersAndIndexes = (numbersCoordinates: TCoords[][]) => numbersCoordinates;

  // .map((row: TCoords[]) => getXvalues(row));

  // const numbersIndexes: TCoords[][] = findSymbolsIndexes(engineArray, /[^0-9]/);

  // console.log(assembleNumbersAndIndexes(numbersIndexes));
};

const findSymbols = (stringData: string[], regex: RegExp): SymbolsList[] =>
  stringData.map((row: string, i: number) => ({
    row: i,
    symbols: [...row.matchAll(regex)].map((numberInfo: RegExpMatchArray) => ({
      symbol: numberInfo[0],
      index: numberInfo.index!
    }))
  }));

const regNumbers: RegExp = /[0-9]+/g;
const regSymbols: RegExp = /[^0-9.]/g;

const dataRows: string[] = splitData(data);
const numbersIndexes: SymbolsList[] = findSymbols(dataRows, regNumbers);
const symbolsIndexes: SymbolsList[] = findSymbols(dataRows, regSymbols);

console.dir(numbersIndexes, { depth: null });
console.log('========================');
console.dir(symbolsIndexes, { depth: null });
console.log('========================');

const res: any = symbolsIndexes.reduce((partNumbers, symbolRow) => {
  const row: number = symbolRow.row;
  const symbolNumbers: IndexedSymbol[] = symbolRow.symbols;

  if (symbolNumbers.length === 0) return partNumbers;
  const numbers: any = symbolNumbers.reduce((acc, curr) => {
    // check one level up
    [-1, 0, 1].forEach((i: number) => {
      const numbers: any = numbersIndexes.find((indexList: SymbolsList) => indexList.row === curr.index + i);
      console.log(numbers);
    });
    return acc;
  }, []);
  return partNumbers;
}, []);
