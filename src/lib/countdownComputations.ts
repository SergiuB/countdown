const MINUTE = 60;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

export interface IValue {
  value: number;
  remainderSec: number;
}

export type ValueComputation = (
  secToFinalDate: number,
  finalDate: Date
) => IValue;

export interface IComputation {
  id: string;
  computeFn: ValueComputation;
}

export interface ICountdownValues {
  [key: string]: IValue;
}

export const dayComputation: IComputation = {
  id: "day",
  computeFn: secToFinalDate => ({
    remainderSec: Math.floor(secToFinalDate % DAY),
    value: Math.floor(secToFinalDate / DAY)
  })
};

export const hourComputation: IComputation = {
  id: "hour",
  computeFn: secToFinalDate => ({
    remainderSec: Math.floor(secToFinalDate % HOUR),
    value: Math.floor(secToFinalDate / HOUR)
  })
};

export const minuteComputation: IComputation = {
  id: "minute",
  computeFn: secToFinalDate => ({
    remainderSec: Math.floor(secToFinalDate % MINUTE),
    value: Math.floor(secToFinalDate / MINUTE)
  })
};

export const secondComputation: IComputation = {
  id: "second",
  computeFn: secToFinalDate => ({
    remainderSec: 0,
    value: secToFinalDate
  })
};

/**
 * Apply a series of computations in order to extract countdown values (e.g. days, hours, minutes).
 *
 * Example:
 * First computation obtains a value, e.g. the number of days, and the remaining number of seconds until the final date.
 * The 2nd computation takes the remaining seconds from the 1st computation and obtains the number of hours,
 * and the remaining number of seconds until the final date.
 * The 3rd computation takes the remaining seconds from the 2nd computation and obtains the number of minutes,
 * and the remaining number of seconds until the final date.
 *
 * @param computations An array of computations
 * @param deltaSec Seconds until the final date
 * @param finalDate Final date of the countdown
 */
export const computeCountdownValues = (
  computations: IComputation[],
  deltaSec: number,
  finalDate: Date
) => {
  // Sequentially apply the computations, feeding the remainder seconds from each computation into the next one.
  const values = computations.reduce(
    (acc, computation, index) => {
      if (!acc.length) {
        acc.push(computation.computeFn(deltaSec, finalDate));
      } else {
        const { remainderSec } = acc[acc.length - 1];
        acc.push(computation.computeFn(remainderSec, finalDate));
      }
      return acc;
    },
    [] as IValue[]
  );

  // Build and return an object with the countdown values, like this:
  // {
  //   days: { value: 4, remainderSec: ... },
  //   hours: { value: 10, remainderSec: ... },
  //   minutes: { value: 35, remainderSec: ... },
  //   seconds: { value: 22, remainderSec: ... },
  // }
  return computations.reduce(
    (acc, computation, index) => {
      acc[computation.id] = values[index];
      return acc;
    },
    {} as ICountdownValues
  );
};
