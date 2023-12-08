import { testData12 as data } from './data/part1-test-data';
// import { data1 as data } from './data/part1-data';

interface DirectionValue {
  [key: string]: number;
}

const directionValues: DirectionValue = {
  'L': 0,
  'R': 1
};

interface Node {
  baseNode: string;
  routes: string[];
}

const getDirections = (dataString: string): Node[] => {
  const directionsArray: string[][] = dataString
    .split('\n')
    .slice(2)
    .map((row: string) => row.split(' = '));

  const directions: Node[] = directionsArray.reduce((directionsList: Node[], directionRow: string[]) => {
    const baseNode: string = directionRow[0];
    const routes: string[] = directionRow[1].replace(/[()]/g, '').split(', ');
    return [...directionsList, { baseNode, routes }];
  }, []);
  return directions;
};

function calculateSteps(instruction: string, directions: Node[]): number {
  function traverse(currInstructions: number[], currNode: Node, steps: number = 0): number {
    if (currNode.baseNode === 'ZZZ') return steps;
    if (currInstructions.length === 0) currInstructions = translatedInstructions;
    // console.log(currNode, steps);

    return traverse(
      currInstructions.slice(1),
      directions.find((node: Node) => node.baseNode === currNode.routes[currInstructions[0]])!,
      steps + 1
    );
  }

  const startNode: Node = directions.find((node: Node) => node.baseNode === 'AAA')!;
  const translatedInstructions: number[] = instruction.split('').map((letter: string) => directionValues[letter]);
  // console.log(startNode);

  return traverse(translatedInstructions, startNode);
}

const intruction: string = data.split('\n')[0];
const directions: Node[] = getDirections(data);
// console.log(intruction);
// console.log(directions);

const steps: number = calculateSteps(intruction, directions);
console.log(steps);
