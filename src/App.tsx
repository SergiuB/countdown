import * as React from "react";
import "./App.css";

import BasicExample from "src/examples/BasicExample";
import CustomMonthExample from "src/examples/CustomMonthExample";
import SecondsOnlyExample from "src/examples/SecondsOnlyExample";
import FunkyExample from "src/examples/FunkyExample";
import I18nExample from "src/examples/I18nExample";

class App extends React.Component {
  public render() {
    const finalDate = new Date(2018, 9, 6, 21, 12, 0);
    return (
      <div className="App">
        <BasicExample finalDate={finalDate} />
        <CustomMonthExample finalDate={finalDate} />
        <SecondsOnlyExample finalDate={finalDate} />
        <FunkyExample finalDate={finalDate} />
        <I18nExample finalDate={finalDate} />
      </div>
    );
  }
}

export default App;
