import * as i18n from "i18next";
import { I18nextProvider } from "react-i18next";

const instance = i18n
  .use(I18nextProvider) // if not using I18nextProvider
  .init({
    lng: "de",
    fallbackLng: "en",
    resources: {
      en: {
        translation: {
          hours: "Hours",
          minutes: "Minutes",
          seconds: "Seconds",
          days: "Days",
          months: "Months"
        }
      },
      de: {
        translation: {
          hours: "Stunden",
          minutes: "Minuten",
          seconds: "Seconden",
          days: "Tagen",
          months: "Monaten"
        }
      }
    }
  });

export default instance;
