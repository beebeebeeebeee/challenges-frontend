import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

import { store } from '../store/store';

const state = store.getState()
export const langList = ["en-US", "zh-HK"]

i18n
    .use(Backend)
    .use(initReactI18next)
    .init({
        backend: {
            loadPath: "/locale/{{lng}}.json",
        },
        fallbackLng: "en-US",
        supportedLngs: langList,
        preload: langList,
        lng: state.lang,
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;