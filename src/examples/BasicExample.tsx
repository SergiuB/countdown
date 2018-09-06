import * as React from "react";
import Countdown from "src/components/Countdown";
import { IExampleProps } from "src/examples/types";

/**
 * Basic countdown with default props.
 */
export default class BasicExample extends React.PureComponent<IExampleProps> {
  public render() {
    return (
      <Countdown finalDate={this.props.finalDate}>
        <Countdown.Title />
        <Countdown.HorizontalLayout>
          <Countdown.DayElement />
          <Countdown.HourElement />
          <Countdown.MinuteElement />
          <Countdown.SecondElement />
        </Countdown.HorizontalLayout>
      </Countdown>
    );
  }
}
