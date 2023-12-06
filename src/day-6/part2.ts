// import { testData1 as data } from './data/part1-test-data';
import { data1 as data } from './data/part1-data';

interface RaceInfo {
  time: number;
  recordDistance: number;
}

interface RaceInfoDetailed extends RaceInfo {
  beatingPossibilities: number[];
}

const splitData = (dataString: string): string[][] =>
  dataString
    .replace(/ /g, '')
    .split('\n')
    .map((row: string) => row.split(':').slice(1));

const range = (start: number, end: number): number[] =>
  Array.from({ length: end - start }).map((_: unknown, i: number) => i + start);

function getRaces(timesArray: string[][]): RaceInfo[] {
  const fieldNames: string[] = ['time', 'recordDistance'];

  const races: RaceInfo[] = range(0, timesArray[0].length).reduce((races: RaceInfo[], timeI: number) => {
    const singleRace: RaceInfo = fieldNames.reduce(
      (game: any, fieldName: string, j: number) => ({ ...game, [fieldName]: +timesArray[j][timeI] }),
      {}
    );
    return [...races, singleRace];
  }, []);
  return races;
}

function analiseRaces(raceList: RaceInfo[]): RaceInfoDetailed[] {
  const detailedRaces: RaceInfoDetailed[] = raceList.reduce((races: RaceInfoDetailed[], race: RaceInfo) => {
    const rTime: number = race.time;
    const rRecord: number = race.recordDistance;
    const beatingPossibilities: number[] = range(1, rTime).reduce((beatingTimes: number[], holdTime: number) => {
      const possibleTime: number = holdTime * (rTime - holdTime);
      if (possibleTime > rRecord) return [...beatingTimes, possibleTime];
      else return beatingTimes;
    }, []);
    return [...races, { ...race, beatingPossibilities }];
  }, []);

  return detailedRaces;
}

const multiplyBeatingPossibilities = (detailedRaceList: RaceInfoDetailed[]): number =>
  detailedRaceList.reduce((product: number, race: RaceInfoDetailed) => product * race.beatingPossibilities.length, 1);

const races: RaceInfo[] = getRaces(splitData(data));
const detailedRaces: RaceInfoDetailed[] = analiseRaces(races);
const result: number = multiplyBeatingPossibilities(detailedRaces);
console.log(result);
