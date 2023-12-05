// import { testData1 as data } from './data/part1-test-data';
import { data1 as data } from './data/part1-data';

interface Card {
  cardNumber: number;
  winningNumbers: number[];
  cardNumbers: number[];
}

interface DetailedCard extends Card {
  cardWinningNumers: number[];
  cardWorth: number;
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

const cardsWithWinnings = (cards: Card[]): DetailedCard[] =>
  cards.reduce((acc: DetailedCard[], card: Card) => {
    const cardWinningNumers: number[] = card.winningNumbers.filter((number: number) =>
      card.cardNumbers.includes(number)
    );
    const cardWorth: number =
      cardWinningNumers.length === 0 ? 0 : cardWinningNumers.reduce((product: number) => product * 2, 1) / 2;
    return [
      ...acc,
      {
        ...card,
        cardWinningNumers,
        cardWorth
      }
    ];
  }, []);

const sumWorth = (detailedCards: DetailedCard[]): number =>
  detailedCards.reduce((sum: number, card: DetailedCard) => sum + card.cardWorth, 0);

const cards: Card[] = jsonifyCards(data);
const detailedCards: DetailedCard[] = cardsWithWinnings(cards);
const netWorth: number = sumWorth(detailedCards);
console.log(netWorth);
