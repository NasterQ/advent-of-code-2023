import { data1 } from './data/part1-data';
// import { testData1 } from './data/part1-test-data';

interface RoundInfo {
  red?: number;
  blue?: number;
  green?: number;
}

interface GameInfo {
  id: number;
  rounds: RoundInfo[];
}

interface GameSummary {
  id: number;
  cubesNeeded: RoundInfo;
}

const separateGames = (textData: string): string[][] => textData.split('\n').map((game: string) => game.split(/[;:]/));

const createGameObject = (gameArr: string[]): GameInfo => {
  const gameDataArr: string[][] = gameArr.map((gameData: string) => gameData.trim().split(', '));
  const gameId: number = parseInt(gameDataArr[0][0].split(' ')[1]);
  const gameSubsets: RoundInfo[] = gameDataArr
    .slice(1)
    .map((subset: string[]) =>
      subset.reduce(
        (acc: RoundInfo, info: string) => ({ ...acc, [info.split(' ')[1]]: parseInt(info.split(' ')[0]) }),
        {}
      )
    );

  const gameObject: GameInfo = {
    id: gameId,
    rounds: gameSubsets
  };

  return gameObject;
};

const findHighestCubesAmountForGame = (rounds: RoundInfo[]): RoundInfo => {
  const defaultObj: RoundInfo = {
    red: 0,
    green: 0,
    blue: 0
  };

  return rounds.reduce(
    (acc: RoundInfo, round: RoundInfo) => ({
      red: Math.max(round.red ?? 0, acc.red!),
      green: Math.max(round.green ?? 0, acc.green!),
      blue: Math.max(round.blue ?? 0, acc.blue!)
    }),
    defaultObj
  );
};

const findHighestCubesAmountForGames = (gameList: GameInfo[]): GameSummary[] =>
  gameList.map((game: GameInfo) => ({ id: game.id, cubesNeeded: findHighestCubesAmountForGame(game.rounds) }));

const calculateCumulativePowerOfCubes = (gameList: GameSummary[]): number =>
  gameList.reduce(
    (sumGames: number, game: GameSummary) =>
      sumGames +
      Object.values(game.cubesNeeded).reduce((productGame: number, cubes: number) => productGame * (cubes || 1), 1),
    0
  );

const getResultNumber = (gameList: GameInfo[]): number => {
  const cubesNeededForGames: GameSummary[] = findHighestCubesAmountForGames(gameList);
  return calculateCumulativePowerOfCubes(cubesNeededForGames);
};

const games: string[][] = separateGames(data1);
const gamesObject: GameInfo[] = games.map((game: string[]) => createGameObject(game));

// console.dir(gamesObject, { depth: null });

// We assume that there cannot be a round with 0 cubes
const result: number = getResultNumber(gamesObject);
console.log(result);
