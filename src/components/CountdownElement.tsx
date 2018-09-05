import * as React from "react";

export interface ICountdownElementProps {
  label: string;
  value: number;
}

export default class CountdownElement extends React.PureComponent<
  ICountdownElementProps
> {
  public render() {
    return (
      <div>
        <p>{this.props.value}</p>
        <p>{this.props.label}</p>
      </div>
    );
  }
}
