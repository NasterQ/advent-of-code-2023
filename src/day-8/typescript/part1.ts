// import { testData12 as data } from './data/part1-test-data';
import { data1 as data } from './data/part1-data';

interface DirectionValue {
  [key: string]: number;
}

interface Nodes {
  [key: string]: string[];
}

const directionValues: DirectionValue = {
  'L': 0,
  'R': 1
};

const getDirections = (dataString: string): Nodes => {
  const directionsArray: string[][] = dataString
    .split('\n')
    .slice(2)
    .map((row: string) => row.split(' = '));

  const directions: Nodes = directionsArray.reduce((directionsList: Nodes, directionRow: string[]) => {
    const baseNode: string = directionRow[0];
    const routes: string[] = directionRow[1].replace(/[()]/g, '').split(', ');
    return { ...directionsList, [baseNode]: routes };
  }, {});

  return directions;
};

function calculateSteps(instruction: string, directions: Nodes): number {
  function traverse(currInstruction: number[], currNode: string, steps: number = 0): number {
    if (currNode === 'ZZZ') return steps;
    if (currInstruction.length === 0) currInstruction = translatedInstructions;
    // console.log(currNode, steps);

    return traverse(currInstruction.slice(1), directions[currNode][currInstruction[0]], steps + 1);
  }

  const translatedInstructions: number[] = instruction.split('').map((letter: string) => directionValues[letter]);

  return traverse(translatedInstructions, 'AAA');
}

const intruction: string = data.split('\n')[0];
const directions: Nodes = getDirections(data);
// console.log(intruction);
// console.log(directions);

const steps: number = calculateSteps(intruction, directions);
console.log(steps);
