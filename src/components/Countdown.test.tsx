import * as React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import Countdown, { CountdownContext } from "./Countdown";
import CountdownComplete from "./CountdownComplete";

jest.useFakeTimers();

let wrapper: ShallowWrapper<any>;
describe("Countdown", () => {
  beforeEach(() => {
    Date.now = jest
      .fn()
      .mockImplementation(() => new Date(2018, 9, 1, 22, 10, 10).getTime());
    wrapper = shallow(
      <Countdown finalDate={new Date(2018, 9, 2, 22, 10, 10)}>
        <Countdown.DayElement />
        <Countdown.HourElement />
        <Countdown.MinuteElement />
        <Countdown.SecondElement />
      </Countdown>
    );
  });
  it("computes days, hours, minutes and seconds until final date", () => {
    // exactly 1 DAY until final date
    expect(wrapper.find(CountdownContext.Provider).props().value).toMatchObject(
      {
        day: { remainderSec: 0, value: 1 },
        hour: { remainderSec: 0, value: 0 },
        minute: { remainderSec: 0, value: 0 },
        second: { remainderSec: 0, value: 0 }
      }
    );
  });

  it("updates the days, hours, minutes and seconds until final date after time elapses", () => {
    // advance Date.now() by 1 hour, 2 minutes, 3 second
    Date.now = jest
      .fn()
      .mockImplementation(() => new Date(2018, 9, 1, 23, 12, 13).getTime());

    // Advance timer 100ms to trigger countdown check
    jest.advanceTimersByTime(100);

    wrapper.update();

    // Now there are 0 days, 22 hours, 57 minutes, 57 seconds until final date
    expect(wrapper.find(CountdownContext.Provider).props().value).toMatchObject(
      {
        day: { remainderSec: 82677, value: 0 },
        hour: { remainderSec: 3477, value: 22 },
        minute: { remainderSec: 57, value: 57 },
        second: { remainderSec: 0, value: 57 }
      }
    );
  });

  it("renders a CountdownComplete after time elapses", () => {
    // advance Date.now() to the final date of the countdown
    Date.now = jest
      .fn()
      .mockImplementation(() => new Date(2018, 9, 2, 22, 10, 10).getTime());

    // Advance timer 100ms to trigger countdown check
    jest.advanceTimersByTime(100);

    wrapper.update();

    expect(wrapper.find(CountdownComplete).length).toBe(1);
  });
});
