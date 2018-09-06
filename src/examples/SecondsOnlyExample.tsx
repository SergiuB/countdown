import * as React from "react";
import Countdown from "src/components/Countdown";
import { IExampleProps } from "src/examples/types";

/**
 * Countdown only with seconds.
 */
export default class SecondsOnlyExample extends React.PureComponent<
  IExampleProps
> {
  public render() {
    return (
      <Countdown
        finalDate={this.props.finalDate}
        computations={[Countdown.secondComputation]}
      >
        <Countdown.SecondElement />
      </Countdown>
    );
  }
}
