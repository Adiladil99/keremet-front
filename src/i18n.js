import { createI18n } from "vue-i18n";
import store  from "./store";

export default createI18n({
  locale: `${store.getters.getLang}`,
  fallbackLocale: "en",
  messages: {
    kz: require("./locales/kz.json"),
    en: require("./locales/en.json"),
    ru: require("./locales/ru.json"),
  },
});