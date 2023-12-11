import { testData12 as data } from './data/part1-test-data';
// import { data1 as data } from './data/part1-data';

interface Coordinates {
  x: number;
  y: number;
}

interface Pipe {
  [key: string]: Coordinates[];
}

interface Tile extends Coordinates {
  pipe: string | number;
}

const pipeTypes: Pipe = {
  '|': [
    { x: 0, y: 1 },
    { x: 0, y: -1 }
  ],
  '-': [
    { x: 1, y: 0 },
    { x: -1, y: 0 }
  ],
  'L': [
    { x: 1, y: 0 },
    { x: 0, y: -1 }
  ],
  'J': [
    { x: -1, y: 0 },
    { x: 0, y: -1 }
  ],
  '7': [
    { x: -1, y: 0 },
    { x: 0, y: 1 }
  ],
  'F': [
    { x: 1, y: 0 },
    { x: 0, y: 1 }
  ],
  'S': [
    { x: 0, y: -1 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: -1, y: 0 }
  ],
  '.': [{ x: 0, y: 0 }]
};

const findStartingPoint = (dataMatrix: string[][]): Tile => {
  const pipe: string = 'S';

  const x: number = dataMatrix
    .filter((row: string[]) => row.includes(pipe))
    .flat()
    .indexOf(pipe);

  const y: number = dataMatrix.findIndex((row: string[]) => row.includes('S'));

  return { pipe, x: y, y: x };
};

const numerisePath = (dataMatrix: string[][]): any => {
  const getTileData = (x: number, y: number): Tile | false => {
    if (x < 0 || x > numerisedMatrix[0].length || y < 0 || y > numerisedMatrix.length) return false;
    return {
      pipe: numerisedMatrix[y][x],
      y: x,
      x: y
    };
  };

  const traverse = (currPoints: Tile[], steps: number = 0): any => {
    if (currPoints[0].pipe === 'S') {
      const currPoint: Tile = currPoints[0];
      const pipesAround: Tile[] = pipeTypes[currPoint.pipe].reduce((allPipes: Tile[], tile: Coordinates) => {
        const currTile: Tile | false = getTileData(currPoint.x + tile.x, currPoint.y + tile.y);
        return currTile ? [...allPipes, currTile] : allPipes;
      }, []);
      const matchingPipes: Tile[] = pipesAround.reduce((matchingPipes: Tile[], pipe: Tile) => {
        if (
          pipeTypes[pipe.pipe].some(
            ({ x, y }: { x: number; y: number }) => x + pipe.x === currPoint.x && y + pipe.y === currPoint.y
          )
        )
          return [...matchingPipes, pipe];
        else return matchingPipes;
      }, []);
      console.log(matchingPipes);
    }
  };

  const numerisedMatrix: (string | number)[][] = dataMatrix.map((row: string[]) => row);
  const startingPoint: Tile = findStartingPoint(dataMatrix);
  console.log(startingPoint);
  traverse([startingPoint]);
};

const splitData: string[][] = data.split('\n').map((row: string) => row.split(''));
numerisePath(splitData);
