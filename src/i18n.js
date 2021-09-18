import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from "locales/en";
import kh from "locales/kh";
import Cookies from 'universal-cookie';

i18n.use(initReactI18next).init({
    resources: {
        en,
        kh,
    },
    lng: new Cookies().get("lang"),
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
    }
});

export default i18n;