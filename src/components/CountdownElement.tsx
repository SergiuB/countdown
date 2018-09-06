import * as React from "react";
import styled from "styled-components";

export interface ICountdownElementProps {
  label: string;
  value: number;
  padZero?: boolean;
}

const Box = styled.div`
  border: 1px solid;
  min-width: 50px;
  height: 50px;
  margin: 2px;
  text-align: center;
`;

const Value = styled.h1`
  margin: 2px 0px 0px 0px;
`;

const Unit = styled.p`
  margin: 0px;
  text-transform: uppercase;
  font-size: 0.5em;
`;

export default class CountdownElement extends React.PureComponent<
  ICountdownElementProps
> {
  public render() {
    return (
      <Box>
        <Value>{this.props.value}</Value>
        <Unit>{this.props.label}</Unit>
      </Box>
    );
  }
}
