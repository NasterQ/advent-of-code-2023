import { testData1 as data } from './data/part1-test-data';
// import { data1 as data } from './data/part1-data';

type TCard = { [key: string]: number };

const cardValues: TCard = {
  'A': 14,
  'K': 13,
  'Q': 12,
  'J': 11,
  'T': 10,
  '9': 9,
  '8': 8,
  '7': 7,
  '6': 6,
  '5': 5,
  '4': 4,
  '3': 3,
  '2': 2
};

enum HandType {
  FIVE_OF_A_KIND = 700,
  FOUR_OF_A_KIND = 600,
  FULL_HOUSE = 500,
  THREE_OF_A_KIND = 400,
  TWO_PAIRS = 300,
  ONE_PAIR = 200,
  HIGH_CARD = 100
}

interface BasicGameInfo {
  cards: string;
  bid: number;
}

interface AdvancedGameInfo extends BasicGameInfo {
  handType: HandType;
}

const splitData = (dataString: string): BasicGameInfo[] =>
  dataString
    .split('\n')
    .map((row: string) => row.split(' '))
    .map((row: string[]) => ({ cards: row[0], bid: parseInt(row[1]) }));

const getHandType = (gameInfo: BasicGameInfo): any => {
  const cards: TCard = gameInfo.cards.split('').reduce((cardsAcc: TCard, card: string) => {
    if (!cardsAcc[card]) cardsAcc[card] = 1;
    else cardsAcc[card] += 1;
    return cardsAcc;
  }, {});

  const sortedCards: [string, number][] = Object.entries(cards).sort(
    ([key1, value1]: [string, number], [key2, value2]: [string, number]) =>
      value2 - value1 || cardValues[key2] - cardValues[key1]
  );

  console.log(cards);
  console.log(sortedCards);
};

// const extendGameInfo = (baseGamesInfo: BasicGameInfo) => baseGames.map((game: BasicGameInfo) => {});

const baseGames: BasicGameInfo[] = splitData(data);
console.log(baseGames);
console.log(getHandType(baseGames[0]));
