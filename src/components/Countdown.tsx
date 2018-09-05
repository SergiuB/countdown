import * as React from "react";
import CountdownElement from "src/components/CountdownElement";
import CountdownComplete from "src/components/CountdownComplete";
import {
  dayComputation,
  hourComputation,
  minuteComputation,
  secondComputation,
  IComputation,
  ICountdownValues,
  computeCountdownValues
} from "src/lib/countdownComputations";

interface ICountdownProps {
  finalDate: Date;
  /** A series of computations that will be applied on the remaining seconds to the final date, in order
   * to obtain the countdown values like days, hours, minutes and so on.
   *
   * If ommitted, then the component will use some predefined computations for days, hours, minutes and seconds.
   * If you wish to also show months, you need to provide your own computation to extract the number of months,
   * in addition to all the other predefined computations for days, hours, minutes and seconds.
   */
  computations?: IComputation[];
  countdownCompleteEl?: React.ReactElement<{}>;
}

interface ICountdownState {
  deltaSec: number;
}

export const CountdownContext = React.createContext<ICountdownValues>({});

/**
 * Computes the countdown values until a specific final date (days, hours, minutes etc.) and passes them via Context API
 * to be consumed by child components.
 */
export default class Countdown extends React.PureComponent<
  ICountdownProps,
  ICountdownState
> {
  /** Predefined computation to extract the number of days */
  public static dayComputation = dayComputation;
  /** Predefined computation to extract the number of hours */
  public static hourComputation = hourComputation;
  /** Predefined computation to extract the number of minutes */
  public static minuteComputation = minuteComputation;
  /** Predefined computation to extract the number of seconds */
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

  private intervalId: any = null;

  public constructor(props: ICountdownProps) {
    super(props);

    this.state = {
      deltaSec: Math.floor((props.finalDate.getTime() - Date.now()) / 1000)
    };
  }

  public render() {
    const { deltaSec } = this.state;

    const countdownCompleteEl = this.props.countdownCompleteEl || (
      <CountdownComplete />
    );

    // By default count down days, hours, minute and seconds.
    const computations = this.props.computations || [
      Countdown.dayComputation,
      Countdown.hourComputation,
      Countdown.minuteComputation,
      Countdown.secondComputation
    ];

    if (deltaSec <= 0) {
      return countdownCompleteEl;
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

  public componentWillUnmount() {
    this.stopCountdown();
  }

  private startCountdown() {
    // Use a timer resolution smaller than 1 second to avoid missing a second due to timer inaccuracy.
    // Setting state every 100ms will not cause the component to rerender after each 100ms, because it is a PureComponent
    // and "deltaSec" changes every second only.
    this.intervalId = setInterval(() => {
      const deltaSec = Math.floor(
        (this.props.finalDate.getTime() - Date.now()) / 1000
      );
      this.setState({ deltaSec });
    }, 100);
  }

  private stopCountdown() {
    clearInterval(this.intervalId);
  }
}
