import * as React from "react";

export interface ICountdownElementProps {
  value: number;
}

export default class CountdownElement extends React.PureComponent<
  ICountdownElementProps
> {
  public render() {
    return <div>{this.props.value}</div>;
  }
}
