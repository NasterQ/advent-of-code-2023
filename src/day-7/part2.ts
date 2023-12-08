// import { testData13 as data } from './data/part1-test-data';
import { data1 as data } from './data/part1-data';

interface CardValue {
  [key: string]: number;
}

const cardValues: CardValue = {
  'A': 14,
  'K': 13,
  'Q': 12,
  'T': 10,
  '9': 9,
  '8': 8,
  '7': 7,
  '6': 6,
  '5': 5,
  '4': 4,
  '3': 3,
  '2': 2,
  'J': 1
};

enum HandTypeValue {
  FIVE_OF_A_KIND = 600,
  FOUR_OF_A_KIND = 500,
  FULL_HOUSE = 400,
  THREE_OF_A_KIND = 300,
  TWO_PAIRS = 200,
  ONE_PAIR = 100,
  HIGH_CARD = 0
}

enum HandType {
  FIVE_OF_A_KIND = 'FIVE_OF_A_KIND',
  FOUR_OF_A_KIND = 'FOUR_OF_A_KIND',
  FULL_HOUSE = 'FULL_HOUSE',
  THREE_OF_A_KIND = 'THREE_OF_A_KIND',
  TWO_PAIRS = 'TWO_PAIRS',
  ONE_PAIR = 'ONE_PAIR',
  HIGH_CARD = 'HIGH_CARD'
}

interface BasicGameInfo {
  cards: string;
  bid: number;
}

interface AdvancedGameInfo extends BasicGameInfo {
  handType: HandType;
  handValue: number;
}

interface AdvancedGameInfoWithRanking extends AdvancedGameInfo {
  rank: number;
  gameWorth: number;
}

const splitData = (dataString: string): BasicGameInfo[] =>
  dataString
    .split('\n')
    .map((row: string) => row.split(' '))
    .map((row: string[]) => ({ cards: row[0], bid: parseInt(row[1]) }));

const getHandType = (gameInfo: BasicGameInfo): AdvancedGameInfo => {
  const createGameInfo = (handType: HandType, handValue: number): AdvancedGameInfo => ({
    ...gameInfo,
    handType,
    handValue
  });

  const cards: CardValue = gameInfo.cards.split('').reduce((cardsAcc: CardValue, card: string) => {
    if (!cardsAcc[card]) cardsAcc[card] = 1;
    else cardsAcc[card] += 1;
    return cardsAcc;
  }, {});

  const sortedCards: [string, number][] = Object.entries(cards)
    .sort(
      ([key1, value1]: [string, number], [key2, value2]: [string, number]) =>
        value2 - value1 || cardValues[key2] - cardValues[key1]
    )
    .filter((card: [string, number]) => card[0] !== 'J');
  const topTwoValues: [string, number][] = [sortedCards[0], sortedCards[1]];

  const foundJokers: [string, number] = Object.entries(cards).filter(
    ([symbol]: [string, number]) => symbol === 'J'
  )[0] || ['J', 0];
  const jokers: number = foundJokers[1];

  switch ((topTwoValues[0]?.[1] || 0) + jokers) {
    case 5:
      return createGameInfo(HandType.FIVE_OF_A_KIND, HandTypeValue.FIVE_OF_A_KIND);
    case 4:
      return createGameInfo(HandType.FOUR_OF_A_KIND, HandTypeValue.FOUR_OF_A_KIND);
    case 3:
      if (topTwoValues[1][1] === 2) return createGameInfo(HandType.FULL_HOUSE, HandTypeValue.FULL_HOUSE);
      else return createGameInfo(HandType.THREE_OF_A_KIND, HandTypeValue.THREE_OF_A_KIND);
    case 2:
      if (topTwoValues[1][1] === 2) return createGameInfo(HandType.TWO_PAIRS, HandTypeValue.TWO_PAIRS);
      else return createGameInfo(HandType.ONE_PAIR, HandTypeValue.ONE_PAIR);
    default:
      return createGameInfo(HandType.HIGH_CARD, HandTypeValue.HIGH_CARD);
  }
};

const extendGameInfo = (baseGamesInfo: BasicGameInfo[]): AdvancedGameInfo[] =>
  baseGamesInfo.map((game: BasicGameInfo) => getHandType(game));

const rankGames = (advancedGamesInfo: AdvancedGameInfo[]): AdvancedGameInfoWithRanking[] => {
  const compareHandsWithSameValue = (cards1: string, cards2: string): number =>
    cards2
      .split('')
      .map((card: string, i: number) => cardValues[card] - cardValues[cards1[i]])
      .filter((num: number) => num !== 0)[0];

  const sortGames = (games: AdvancedGameInfo[]): AdvancedGameInfo[] =>
    games.sort(
      (c1: AdvancedGameInfo, c2: AdvancedGameInfo) =>
        c1.handValue - c2.handValue || compareHandsWithSameValue(c2.cards, c1.cards)
    );

  const sortedGames: AdvancedGameInfo[] = sortGames(advancedGamesInfo);

  const rankedGames: AdvancedGameInfoWithRanking[] = sortedGames.map((game: AdvancedGameInfo, i: number) => ({
    ...game,
    rank: i + 1,
    gameWorth: (i + 1) * game.bid
  }));

  return rankedGames;
};

const baseGames: BasicGameInfo[] = splitData(data);
const gamesInfo: AdvancedGameInfo[] = extendGameInfo(baseGames);
const rankedGames: AdvancedGameInfoWithRanking[] = rankGames(gamesInfo);
// console.log(rankedGames);

const summedResult: number = rankedGames.reduce(
  (sum: number, game: AdvancedGameInfoWithRanking) => sum + game.gameWorth,
  0
);
console.log(summedResult);
