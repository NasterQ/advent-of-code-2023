import { data1 } from './data/part1-data';
// import { testData1 } from './data/part1-test-data';

type TColour = string;

interface RoundInfo {
  red?: number;
  blue?: number;
  green?: number;
}

interface GameInfo {
  id: number;
  rounds: RoundInfo[];
}

const cubeLimits: { [colour: TColour]: number } = {
  red: 12,
  green: 13,
  blue: 14
};

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

const isGamePossible = (games: GameInfo): boolean => {
  const isRoundPossible = (round: RoundInfo): boolean =>
    Object.entries(round).every(([colour, quantity]: [TColour, number]) => quantity <= cubeLimits[colour]);
  return games.rounds.every(isRoundPossible);
};

const sumPossibleGamesIds = (gameList: GameInfo[]): number =>
  gameList.reduce((acc: number, game: GameInfo) => (isGamePossible(game) ? acc + game.id : acc), 0);

const games: string[][] = separateGames(data1);
const gamesObject: GameInfo[] = games.map((game: string[]) => createGameObject(game));

const result: number = sumPossibleGamesIds(gamesObject);
console.log(result);
