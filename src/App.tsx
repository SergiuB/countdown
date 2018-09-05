import * as React from "react";
import "./App.css";

import Countdown, {
  CountdownContext,
  IComputation
} from "src/components/Countdown";
import CountdownElement from "src/components/CountdownElement";

const MonthElement = () => (
  <CountdownContext.Consumer>
    {({ month }) =>
      month !== undefined && <CountdownElement value={month.value} />
    }
  </CountdownContext.Consumer>
);

const monthComputation: IComputation = {
  id: "month",
  computeFn: (sec, finalDate) => {
    const startDate = new Date(finalDate.getTime() - sec * 1000);

    let months;
    let remainderDate;

    const finalDateWithStartMonthAndYear = new Date(
      finalDate.getFullYear(),
      finalDate.getMonth(),
      startDate.getDate(),
      startDate.getHours(),
      startDate.getMinutes(),
      startDate.getSeconds()
    );

    if (finalDateWithStartMonthAndYear.getTime() <= finalDate.getTime()) {
      months =
        (finalDate.getFullYear() - startDate.getFullYear()) * 12 +
        (finalDate.getMonth() - startDate.getMonth());

      remainderDate = new Date(
        finalDate.getFullYear(),
        finalDate.getMonth(),
        startDate.getDate(),
        startDate.getHours(),
        startDate.getMinutes(),
        startDate.getSeconds()
      );
    } else {
      months =
        (finalDate.getFullYear() - startDate.getFullYear()) * 12 +
        (finalDate.getMonth() - startDate.getMonth()) -
        1;

      const remainderDateMonth = finalDate.getMonth()
        ? finalDate.getMonth() - 1
        : 11;
      const remainderDateYear = finalDate.getMonth()
        ? finalDate.getFullYear()
        : finalDate.getFullYear() - 1;

      remainderDate = new Date(
        remainderDateYear,
        remainderDateMonth,
        startDate.getDate(),
        startDate.getHours(),
        startDate.getMinutes(),
        startDate.getSeconds()
      );
    }

    return {
      value: months,
      remainderSec: months
        ? (finalDate.getTime() - remainderDate.getTime()) / 1000
        : sec
    };
  }
};

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <Countdown finalDate={new Date(2018, 9, 6, 21, 12, 0)}>
          <Countdown.DayElement />
          <Countdown.HourElement />
          <Countdown.MinuteElement />
          <Countdown.SecondElement />
        </Countdown>
        <div style={{ height: 200 }} />
        <Countdown
          finalDate={new Date(2018, 9, 6, 21, 12, 0)}
          computations={[
            monthComputation,
            Countdown.dayComputation,
            Countdown.hourComputation,
            Countdown.minuteComputation,
            Countdown.secondComputation
          ]}
        >
          <MonthElement />
          <Countdown.DayElement />
          <Countdown.HourElement />
          <Countdown.MinuteElement />
          <Countdown.SecondElement />
        </Countdown>
      </div>
    );
  }
}

export default App;
