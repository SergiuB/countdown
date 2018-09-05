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

export interface IElementValues {
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

export const computeCountdownValues = (
  computations: IComputation[],
  deltaSec: number,
  finalDate: Date
) => {
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

  return computations.reduce(
    (acc, computation, index) => {
      acc[computation.id] = values[index];
      return acc;
    },
    {} as IElementValues
  );
};
