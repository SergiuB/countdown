import * as React from "react";
import Countdown, { CountdownContext } from "src/components/Countdown";
import { IComputation } from "src/lib/countdownComputations";
import { IExampleProps } from "src/examples/types";

/**
 * Custom countdown element to display remaining months.
 */
const MonthElement = () => (
  <CountdownContext.Consumer>
    {({ month }) =>
      month !== undefined && (
        <Countdown.Element value={month.value} label="Months" />
      )
    }
  </CountdownContext.Consumer>
);

/**
 * Custom computation for obtaining the calendar month count.
 * Out of the project scope, only to illustrate how the component
 * can be extended with month count, without any modification.
 */
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

export default class CustomMonthExample extends React.PureComponent<
  IExampleProps
> {
  public render() {
    return (
      <Countdown
        finalDate={this.props.finalDate}
        computations={[
          monthComputation,
          Countdown.dayComputation,
          Countdown.hourComputation,
          Countdown.minuteComputation,
          Countdown.secondComputation
        ]}
      >
        <Countdown.Title />
        <Countdown.HorizontalLayout>
          <MonthElement />
          <Countdown.DayElement />
          <Countdown.HourElement />
          <Countdown.MinuteElement />
          <Countdown.SecondElement />
        </Countdown.HorizontalLayout>
      </Countdown>
    );
  }
}
