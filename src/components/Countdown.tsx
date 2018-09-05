import * as React from "react";
import CountdownElement from "src/components/CountdownElement";

export interface IValue {
  value: number;
  remainderSec: number;
}

export type ValueComputation = (ms: number, finalDate: Date) => IValue;

export interface IComputation {
  id: string;
  computeFn: ValueComputation;
}

interface ICountdownProps {
  finalDate: Date;
  computations?: IComputation[];
}

interface ICountdownState {
  delta: number;
}

interface IElementValues {
  [key: string]: IValue;
}

export const CountdownContext = React.createContext<IElementValues>({});

const SECOND = 1;
const MINUTE = 60;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

const computeDays: ValueComputation = sec => ({
  remainderSec: Math.floor(sec % DAY),
  value: Math.floor(sec / DAY)
});

const computeHours: ValueComputation = sec => ({
  remainderSec: Math.floor(sec % HOUR),
  value: Math.floor(sec / HOUR)
});

const computeMinutes: ValueComputation = sec => ({
  remainderSec: Math.floor(sec % MINUTE),
  value: Math.floor(sec / MINUTE)
});

const computeSeconds: ValueComputation = sec => ({
  remainderSec: Math.floor(sec % SECOND),
  value: Math.floor(sec / SECOND)
});

export default class Countdown extends React.PureComponent<
  ICountdownProps,
  ICountdownState
> {
  public static dayComputation = {
    id: "day",
    computeFn: computeDays
  };
  public static hourComputation = {
    id: "hour",
    computeFn: computeHours
  };
  public static minuteComputation = {
    id: "minute",
    computeFn: computeMinutes
  };
  public static secondComputation = {
    id: "second",
    computeFn: computeSeconds
  };

  public static DayElement = () => (
    <CountdownContext.Consumer>
      {({ day }) => day !== undefined && <CountdownElement value={day.value} />}
    </CountdownContext.Consumer>
  );

  public static HourElement = () => (
    <CountdownContext.Consumer>
      {({ hour }) =>
        hour !== undefined && <CountdownElement value={hour.value} />
      }
    </CountdownContext.Consumer>
  );

  public static MinuteElement = () => (
    <CountdownContext.Consumer>
      {({ minute }) =>
        minute !== undefined && <CountdownElement value={minute.value} />
      }
    </CountdownContext.Consumer>
  );

  public static SecondElement = () => (
    <CountdownContext.Consumer>
      {({ second }) =>
        second !== undefined && <CountdownElement value={second.value} />
      }
    </CountdownContext.Consumer>
  );

  public state = {
    delta: -1
  };

  public render() {
    const { delta } = this.state;
    const computations = this.props.computations || [
      Countdown.dayComputation,
      Countdown.hourComputation,
      Countdown.minuteComputation,
      Countdown.secondComputation
    ];

    if (delta < 0) {
      return null;
    }

    const values = computations.reduce(
      (acc, computation, index) => {
        if (!acc.length) {
          acc.push(computation.computeFn(delta, this.props.finalDate));
        } else {
          const { remainderSec } = acc[acc.length - 1];
          acc.push(computation.computeFn(remainderSec, this.props.finalDate));
        }
        return acc;
      },
      [] as IValue[]
    );

    const elementValues = computations.reduce(
      (acc, computation, index) => {
        acc[computation.id] = values[index];
        return acc;
      },
      {} as IElementValues
    );

    return (
      <CountdownContext.Provider value={elementValues}>
        {this.props.children}
      </CountdownContext.Provider>
    );
  }

  public componentDidMount() {
    this.startCountdown();
  }

  private startCountdown() {
    setInterval(() => {
      const deltaMs = this.props.finalDate.getTime() - Date.now();
      const delta = Math.floor(deltaMs / 1000);
      this.setState({ delta });
    }, 100);
  }
}
