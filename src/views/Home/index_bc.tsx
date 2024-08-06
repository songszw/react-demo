import {Suspense} from "react";
import {Outlet, NavLink} from "react-router-dom";

import {useTranslation, Trans} from "react-i18next";
import dayjs from "dayjs";
import {Button} from "antd";


const lngs :{
	[key: string]: { nativeName: string}
}= {
	en: {nativeName: "English"},
	zh: {nativeName: "中文"}
}
const Home = () => {
	const { t, i18n } = useTranslation()
	return (
		<>
			<div className="header">
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
			<div className="main">
				<aside>
					<div className="menu_item">
						<NavLink to="/" end>
							user
						</NavLink>
					</div>
					<div className="menu_item">
						<NavLink to="/manage" end>
							manage
						</NavLink>
					</div>
				</aside>
				<section>
					<Suspense fallback={<div>Loading...</div>}>
						<Outlet />
					</Suspense>
				</section>
			</div>
		</>
	)
}

export default Home


