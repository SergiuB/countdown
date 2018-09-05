import * as React from "react";
import { I18n } from "react-i18next";
import Countdown from "src/components/Countdown";
import { IExampleProps } from "src/examples/types";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n"; // initialized i18next instance

export default class I18nExample extends React.PureComponent<IExampleProps> {
  public render() {
    return (
      <I18nextProvider i18n={i18n}>
        <I18n>
          {t => (
            <Countdown finalDate={this.props.finalDate}>
              <Countdown.DayElement label={t("days")} />
              <Countdown.HourElement label={t("hours")} />
              <Countdown.MinuteElement label={t("minutes")} />
              <Countdown.SecondElement label={t("seconds")} />
            </Countdown>
          )}
        </I18n>
      </I18nextProvider>
    );
  }
}
