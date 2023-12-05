// import { testData1 as data } from './data/part1-test-data';
import { data1 as data } from './data/part1-data';

interface Card {
  cardNumber: number;
  winningNumbers: number[];
  cardNumbers: number[];
}

interface DetailedCard extends Card {
  cardWinningNumers: number[];
  wonCards: number[];
}

interface CardStatistics {
  cardNumber: number;
  cardQuantity: number;
}

function jsonifyCards(cardsString: string): Card[] {
  const splitNumbers = (numbersString: string): number[] =>
    numbersString
      .trim()
      .split(' ')
      .map((numStr: string) => parseInt(numStr));

  const rows: string[][] = cardsString.split('\n').map((row: string) => row.replace(/\s+/g, ' ').split(/[:|]/));

  const cardObjects: Card[] = rows.map((row: string[]) => {
    const cardNumber: number = parseInt(row[0].split(' ')[1]);
    const winningNumbers: number[] = splitNumbers(row[1]);
    const cardNumbers: number[] = splitNumbers(row[2]);

    return {
      cardNumber,
      winningNumbers,
      cardNumbers
    };
  });

  return cardObjects;
}

const range = (start: number, stop: number, step: number = 1): number[] =>
  Array.from({ length: (stop - start) / step + 1 }, (_: number, i: number) => start + i * step);

const cardsWithWinnings = (cards: Card[]): DetailedCard[] =>
  cards.reduce((acc: DetailedCard[], card: Card) => {
    const cardWinningNumers: number[] = card.winningNumbers.filter((number: number) =>
      card.cardNumbers.includes(number)
    );
    const wonCards: number[] =
      cardWinningNumers.length === 0 ? [] : range(card.cardNumber + 1, cardWinningNumers.length + card.cardNumber);
    return [
      ...acc,
      {
        ...card,
        cardWinningNumers,
        wonCards
      }
    ];
  }, []);

function cardsFrenzy(
  detailedCardsList: DetailedCard[],
  detailedCards: DetailedCard[],
  cardStatistics: CardStatistics[]
): CardStatistics[] {
  const finalStatistics: CardStatistics[] = detailedCards.reduce((stats: CardStatistics[], card: DetailedCard) => {
    const newCards: DetailedCard[] = card.wonCards.reduce(
      (cards: DetailedCard[], wonCardNum: number) => [
        ...cards,
        detailedCardsList.find((detCard: DetailedCard) => detCard.cardNumber === wonCardNum)!
      ],
      []
    );
    const newStatistics: CardStatistics[] = stats.reduce((newStats: CardStatistics[], stat: CardStatistics) => {
      if (newCards.map((newCard: DetailedCard) => newCard.cardNumber).includes(stat.cardNumber)) {
        const newStat: CardStatistics = {
          cardNumber: stat.cardNumber,
          cardQuantity: stat.cardQuantity + 1
        };
        return [...newStats, newStat];
      } else return [...newStats, stat];
    }, []);

    // Continue with the operations if newer cards were won
    if (newCards.flatMap((newCard: DetailedCard) => newCard.wonCards).length !== 0)
      return cardsFrenzy(detailedCardsList, newCards, newStatistics);
    return newStatistics;
  }, cardStatistics);

  return finalStatistics;
}

const sumCardsQuantity = (cardsStatistics: CardStatistics[]): number =>
  cardsStatistics.reduce((sum: number, cardStat: CardStatistics) => sum + cardStat.cardQuantity, 0);

const cards: Card[] = jsonifyCards(data);
const detailedCards: DetailedCard[] = cardsWithWinnings(cards);

const baseStatistics: CardStatistics[] = detailedCards.map((card: DetailedCard) => ({
  cardNumber: card.cardNumber,
  cardQuantity: 1
}));

const cardsStatistics: CardStatistics[] = cardsFrenzy(detailedCards, detailedCards, baseStatistics);
const cardsQuantity: number = sumCardsQuantity(cardsStatistics);
console.log(cardsQuantity);
