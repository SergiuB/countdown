import * as React from "react";
import Countdown from "src/Countdown";
import { IExampleProps } from "src/examples/types";
import styled, { keyframes } from "styled-components";

const leftSpin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const rightSpin = keyframes`
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
`;

const AnimatedDiv = styled.div`
  animation-duration: 4000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
`;

const SpinRight = styled(AnimatedDiv)`
  animation-name: ${rightSpin};
`;

const SpinLeft = styled(AnimatedDiv)`
  animation-name: ${leftSpin};
`;

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
        <SpinRight>
          <Countdown.DayElement />
        </SpinRight>
        <SpinLeft>
          <Countdown.HourElement />
        </SpinLeft>
      </Countdown>
    );
  }
}
