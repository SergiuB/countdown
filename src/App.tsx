import * as React from "react";
import { ChangeEvent } from "react";
import styled from "styled-components";

import BasicExample from "src/examples/BasicExample";
import CustomMonthExample from "src/examples/CustomMonthExample";
import SecondsOnlyExample from "src/examples/SecondsOnlyExample";
import FunkyExample from "src/examples/FunkyExample";
import I18nExample from "src/examples/I18nExample";

const AppContainer = styled.div`
  font-family: sans-serif;
`;

const ExampleContainer = styled.div`
  padding: 5px;
  display: flex;
  align-items: center;
  width: 400px;
  justify-content: space-between;
`;

const DateTimeContainer = styled.div`
  padding: 5px;
`;

const Input = styled.input`
  margin: 2px;
`;

const padOneZero = (value: number) => (value < 10 ? `0${value}` : `${value}`);

const LinkToSource = ({ url }: { url: string }) => (
  <a target="_blank" rel="noopener" href={url}>
    View source
  </a>
);

class App extends React.Component {
  public state = {
    finalDate: new Date(2018, 9, 31, 23, 59, 59)
  };
  public render() {
    const { finalDate } = this.state;
    return (
      <AppContainer>
        <DateTimeContainer>
          <label>Select a date and a time:</label>
          <Input
            type="date"
            required={true}
            value={`${finalDate.getFullYear()}-${padOneZero(
              finalDate.getMonth() + 1
            )}-${padOneZero(finalDate.getDate())}`}
            onChange={this.handleDateChange}
          />
          <Input
            type="time"
            step="1"
            required={true}
            value={`${padOneZero(finalDate.getHours())}:${padOneZero(
              finalDate.getMinutes()
            )}:${padOneZero(finalDate.getSeconds())}`}
            onChange={this.handleTimeChange}
          />
        </DateTimeContainer>
        <ExampleContainer>
          <BasicExample finalDate={finalDate} />
          <LinkToSource url="https://github.com/SergiuB/countdown/blob/35513b13a7aa2157556e822bcb598eac8a006baf/src/examples/BasicExample.tsx" />
        </ExampleContainer>
        <ExampleContainer>
          <CustomMonthExample finalDate={finalDate} />
          <LinkToSource url="https://github.com/SergiuB/countdown/blob/35513b13a7aa2157556e822bcb598eac8a006baf/src/examples/CustomMonthExample.tsx" />
        </ExampleContainer>
        <ExampleContainer>
          <SecondsOnlyExample finalDate={finalDate} />
          <LinkToSource url="https://github.com/SergiuB/countdown/blob/35513b13a7aa2157556e822bcb598eac8a006baf/src/examples/SecondsOnlyExample.tsx" />
        </ExampleContainer>
        <ExampleContainer>
          <FunkyExample finalDate={finalDate} />
          <LinkToSource url="https://github.com/SergiuB/countdown/blob/35513b13a7aa2157556e822bcb598eac8a006baf/src/examples/FunkyExample.tsx" />
        </ExampleContainer>
        <ExampleContainer>
          <I18nExample finalDate={finalDate} />
          <LinkToSource url="https://github.com/SergiuB/countdown/blob/35513b13a7aa2157556e822bcb598eac8a006baf/src/examples/I18nExample.tsx" />
        </ExampleContainer>
      </AppContainer>
    );
  }

  private handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.validity.valid) {
      return;
    }
    const { finalDate } = this.state;
    const newDate = new Date(event.target.value);

    const newFinalDate = new Date(
      newDate.getFullYear(),
      newDate.getMonth(),
      newDate.getDate(),
      finalDate.getHours(),
      finalDate.getMinutes(),
      finalDate.getSeconds()
    );

    this.setState({
      finalDate: newFinalDate
    });
  };

  private handleTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.validity.valid) {
      return;
    }
    const { finalDate } = this.state;
    const [h = 0, m = 0, s = 0] = event.target.value
      .split(":")
      .map(n => Number.parseInt(n, 10));
    const newFinalDate = new Date(
      finalDate.getFullYear(),
      finalDate.getMonth(),
      finalDate.getDate(),
      h,
      m,
      s
    );

    this.setState({
      finalDate: newFinalDate
    });
  };
}

export default App;
