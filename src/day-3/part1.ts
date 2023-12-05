// import { testData1 as data } from './data/part1-test-data';
import { data1 as data } from './data/part1-data';

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

const regNumbers: RegExp = /[0-9]+/g;
const regSymbols: RegExp = /[^0-9.]/g;

const dataRows: string[] = splitData(data);
const numbersIndexes: SymbolsList[] = findSymbols(dataRows, regNumbers);
const symbolsIndexes: SymbolsList[] = findSymbols(dataRows, regSymbols);

// console.dir(numbersIndexes, { depth: null });
// console.log('========================');
// console.dir(symbolsIndexes, { depth: null });
// console.log('========================');

const partNumbers: number[] = symbolsIndexes.reduce((partNumbers: number[], symbolRow: SymbolsList, i: number) => {
  const symbolNumbers: IndexedSymbol[] = symbolRow.symbols;

  if (symbolNumbers.length === 0) return partNumbers;

  const numbers: number[] = symbolNumbers.reduce((acc: number[], curr: IndexedSymbol) => {
    // find numbers on adjacent rows
    const numbersOnRow: SymbolsList[] = [-1, 0, 1].reduce((acc: SymbolsList[], j: number) => {
      const numbersOnRow: SymbolsList | undefined = numbersIndexes.find(
        (indexList: SymbolsList) => indexList.row === i + j
      );
      // console.dir(numbersOnRow, { depth: null });
      return numbersOnRow !== undefined ? [...acc, numbersOnRow] : acc;
    }, []);
    // console.dir(numbersOnRow, { depth: null });
    const adjacentNumbers: number[] = [-1, 0, 1].reduce((acc2: number[], j: number) => {
      const foundNumbers: number[] = numbersOnRow.reduce((acc3: number[], row: SymbolsList) => {
        const numbers: number[] = row.symbols.reduce((symbolAcc: number[], symbol: IndexedSymbol) => {
          // console.log(symbol, curr, curr.indexes[0] + j, symbol.indexes.includes(curr.indexes[0] + j));

          if (symbol.indexes.includes(curr.indexes[0] + j)) {
            // Eliminate unwanted duplicates - [not clean - changes array outside]
            symbol.indexes = [-5];
            return [...symbolAcc, parseInt(symbol.symbol)];
          } else return symbolAcc;
        }, []);
        return [...acc3, ...numbers];
      }, []);

      return [...acc2, ...foundNumbers];
    }, []);
    return [...acc, ...adjacentNumbers];
  }, []);
  return [...partNumbers, ...numbers];
}, []);

// console.dir(numbersIndexes, { depth: null });
// console.log(partNumbers);

const partSum = (numbers: number[]): number => numbers.reduce((sum: number, number: number) => sum + number, 0);
const result: number = partSum(partNumbers);
console.log(result);
