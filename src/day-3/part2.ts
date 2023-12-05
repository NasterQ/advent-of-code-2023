// import { testData1 as data } from './data/part1-test-data';
import { data1 as data } from './data/part1-data';

enum PartType {
  NORMAL = 'NORMAL',
  GEARS = 'GEARS'
}

interface IndexedSymbol {
  symbol: string;
  indexes: number[];
}

interface SymbolsList {
  row: number;
  symbols: IndexedSymbol[];
}

const splitData = (textData: string): string[] => textData.split('\n');

const range = (size: number, startAt: number = 0): number[] => [...Array(size).keys()].map((i: number) => i + startAt);

const findSymbols = (stringData: string[], regex: RegExp): SymbolsList[] =>
  stringData.map((row: string, i: number) => ({
    row: i,
    symbols: [...row.matchAll(regex)].map((numberInfo: RegExpMatchArray) => ({
      symbol: numberInfo[0],
      indexes: numberInfo[0].length === 1 ? [numberInfo.index!] : range(numberInfo[0].length, numberInfo.index!)
    }))
  }));

function getPartNumbers(partIndexes: SymbolsList[], type: PartType = PartType.NORMAL): number[] {
  const numbersIndexes: SymbolsList[] = findSymbols(dataRows, regNumbers);
  const partNumbers: number[] = partIndexes.reduce((partNumbers: number[], symbolRow: SymbolsList, i: number) => {
    const symbolNumbers: IndexedSymbol[] = symbolRow.symbols;

    if (symbolNumbers.length === 0) return partNumbers;

    const numbers: number[] = symbolNumbers.reduce((acc: number[], curr: IndexedSymbol) => {
      // find numbers on adjacent rows
      const numbersOnRow: SymbolsList[] = [-1, 0, 1].reduce((acc: SymbolsList[], j: number) => {
        const numbersOnRow: SymbolsList | undefined = numbersIndexes.find(
          (indexList: SymbolsList) => indexList.row === i + j
        );
        return numbersOnRow !== undefined ? [...acc, numbersOnRow] : acc;
      }, []);
      const adjacentNumbers: number[] = [-1, 0, 1].reduce((acc2: number[], j: number) => {
        const foundNumbers: number[] = numbersOnRow.reduce((acc3: number[], row: SymbolsList) => {
          const numbers: number[] = row.symbols.reduce((symbolAcc: number[], symbol: IndexedSymbol) => {
            if (symbol.indexes.includes(curr.indexes[0] + j)) {
              // Eliminate unwanted duplicates
              symbol.indexes = [-5];
              return [...symbolAcc, parseInt(symbol.symbol)];
            } else return symbolAcc;
          }, []);
          return [...acc3, ...numbers];
        }, []);
        return [...acc2, ...foundNumbers];
      }, []);
      if (type === PartType.GEARS)
        if (adjacentNumbers.length === 2) return [...acc, adjacentNumbers[0] * adjacentNumbers[1]];
        else return acc;
      return [...acc, ...adjacentNumbers];
    }, []);
    return [...partNumbers, ...numbers];
  }, []);
  return partNumbers;
}
const partSum = (numbers: number[]): number => numbers.reduce((sum: number, number: number) => sum + number, 0);

const regNumbers: RegExp = /[0-9]+/g;
const regPossibleGears: RegExp = /\*/g;

const dataRows: string[] = splitData(data);
const possibleGearsIndexes: SymbolsList[] = findSymbols(dataRows, regPossibleGears);

const gearsNumbers: number[] = getPartNumbers(possibleGearsIndexes, PartType.GEARS);

const result: number = partSum(gearsNumbers);
console.log(result);
