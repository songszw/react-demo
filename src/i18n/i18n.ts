import i18n, {InitOptions} from "i18next";
import {initReactI18next} from "react-i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import I18NextHttpBackend from "i18next-http-backend";
import dayjs from "dayjs";

i18n
	.use(I18NextHttpBackend)
	.use(I18nextBrowserLanguageDetector)
	.use(initReactI18next)
	.init({
		debug: true,
		fallbackLng: 'zh',
		interpolation: {
			escapeValue: false
		},
	} as InitOptions)

i18n.services.formatter?.add('DD/MM/YYYY', (value) => {
	return dayjs(value).format('DD/MM/YYYY')
})

i18n.services.formatter?.add('YYYY-MM-DD', (value) => {
	return dayjs(value).format('YYYY-MM-DD')
})



export default i18n
