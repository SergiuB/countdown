import * as React from "react";
import Countdown from "src/Countdown";
import { IExampleProps } from "src/examples/types";
import "./examples.css";

/**
 * Customizing the countdown elements.
 * Thanks to the Compound Component pattern we have full control over how the countdown elements are rendered.
 */
export default class FunkyExample extends React.PureComponent<IExampleProps> {
  public render() {
    return (
      <Countdown
        finalDate={this.props.finalDate}
        computations={[Countdown.dayComputation, Countdown.hourComputation]}
      >
        <div className="spin-right">
          <Countdown.DayElement />
        </div>
        <div className="spin-left">
          <Countdown.HourElement />
        </div>
      </Countdown>
    );
  }
}
