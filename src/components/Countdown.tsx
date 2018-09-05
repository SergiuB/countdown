import * as React from "react";
import CountdownElement from "src/components/CountdownElement";
import {
  dayComputation,
  hourComputation,
  minuteComputation,
  secondComputation,
  IComputation,
  IElementValues,
  computeCountdownValues
} from "src/lib/countdownComputations";

interface ICountdownProps {
  finalDate: Date;
  computations?: IComputation[];
}

interface ICountdownState {
  deltaSec: number;
}

export const CountdownContext = React.createContext<IElementValues>({});

export default class Countdown extends React.PureComponent<
  ICountdownProps,
  ICountdownState
> {
  public static dayComputation = dayComputation;
  public static hourComputation = hourComputation;
  public static minuteComputation = minuteComputation;
  public static secondComputation = secondComputation;

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
    deltaSec: -1
  };

  public render() {
    const { deltaSec } = this.state;

    // By default count down days, hours, minute and seconds.
    const computations = this.props.computations || [
      Countdown.dayComputation,
      Countdown.hourComputation,
      Countdown.minuteComputation,
      Countdown.secondComputation
    ];

    if (deltaSec < 0) {
      return null;
    }

    const countdownValues = computeCountdownValues(
      computations,
      deltaSec,
      this.props.finalDate
    );

    return (
      <CountdownContext.Provider value={countdownValues}>
        {this.props.children}
      </CountdownContext.Provider>
    );
  }

  public componentDidMount() {
    this.startCountdown();
  }

  private startCountdown() {
    // Use a timer resolution smaller than 1 second to avoid missing a second due to timer inaccuracy.
    // Setting state every 100ms will not cause the component to rerender after each 100ms, because it is a PureComponent
    // and "delta" changes every second.
    setInterval(() => {
      const deltaMs = this.props.finalDate.getTime() - Date.now();
      const deltaSec = Math.floor(deltaMs / 1000);
      this.setState({ deltaSec });
    }, 100);
  }
}
