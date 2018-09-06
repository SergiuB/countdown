import * as React from "react";
import styled from "styled-components";

export interface ICountdownTitleProps {
  title: string;
}

const Title = styled.p`
  margin: 0px 0px 0px 2px;
  text-transform: uppercase;
  font-size: 0.8em;
`;

export default class CountdownTitle extends React.PureComponent<
  ICountdownTitleProps
> {
  public render() {
    return <Title>{this.props.title}</Title>;
  }
}
