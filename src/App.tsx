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
`;

const DateTimeContainer = styled.div`
  padding: 5px;
`;

const Input = styled.input`
  margin: 2px;
`;

const padOneZero = (value: number) => (value < 10 ? `0${value}` : `${value}`);

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
          <a href="">View source</a>
        </ExampleContainer>
        <ExampleContainer>
          <CustomMonthExample finalDate={finalDate} />
        </ExampleContainer>
        <ExampleContainer>
          <SecondsOnlyExample finalDate={finalDate} />
        </ExampleContainer>
        <ExampleContainer>
          <FunkyExample finalDate={finalDate} />
        </ExampleContainer>
        <ExampleContainer>
          <I18nExample finalDate={finalDate} />
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

    console.log(newFinalDate);

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

    console.log(event.target.validity);
    console.log(newFinalDate);

    this.setState({
      finalDate: newFinalDate
    });
  };
}
export default App;
