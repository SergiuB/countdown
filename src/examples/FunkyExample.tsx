import * as React from "react";
import Countdown from "src/components/Countdown";
import { IExampleProps } from "src/examples/types";
import "./examples.css";

export default class FunkyExample extends React.PureComponent<IExampleProps> {
  public render() {
    return (
      <Countdown
        finalDate={this.props.finalDate}
        computations={[Countdown.dayComputation, Countdown.hourComputation]}
      >
        <Countdown.Title />
        <Countdown.HorizontalLayout>
          <div className="spin-right">
            <Countdown.DayElement />
          </div>
          <div className="spin-left">
            <Countdown.HourElement />
          </div>
        </Countdown.HorizontalLayout>
      </Countdown>
    );
  }
}
