import {Trans, useTranslation} from "react-i18next";
import dayjs from "dayjs";
import {Button} from "antd";
import {Suspense} from "react";
import {Outlet} from "react-router-dom";
import './index.less'

const lngs: {
	[key: string]: {nativeName: string}
} = {
	en: {nativeName: "English"},
	zh: {nativeName: "中文"}
}

const Layout = () => {
	const { t, i18n } = useTranslation()
	return (
		<>
			<div className="header bg-blue-tifanni">
				<header>
					<select onChange={(evt) => {
						i18n.changeLanguage(evt.target.value)
					}}>
						{Object.keys(lngs).map((lng) => (
							<option
								key={lng}
								value={lng}
								label={lngs[lng].nativeName}
								style={{fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal'}}
							></option>
						))}
					</select>
				</header>
				<div>登录页面</div>
				<p>{t('currentTime', {time: dayjs('2033-4-21').format("MM/DD/YYYY")})}</p>
				<Trans i18nKey="login">
					<Button type="primary">{t('login')}</Button>
				</Trans>
			</div>
			<main className={"main"}>
				<section style={{width: "100%"}}>
					<Suspense fallback={<div>Loading...</div>}>
						<Outlet />
					</Suspense>
				</section>
			</main>

		</>
	)
}

export default Layout
