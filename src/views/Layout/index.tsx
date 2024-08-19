import { useTranslation } from "react-i18next";
// import dayjs from "dayjs";
import {Button, Dropdown, MenuProps} from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import {Suspense, useEffect, useState} from "react";
import { Outlet, useNavigate } from "react-router-dom";
import './index.less'

// const lngs: {
// 	[key: string]: {nativeName: string}
// } = {
// 	en: {nativeName: "English"},
// 	zh: {nativeName: "中文"}
// }

interface UserInfo {
	username: string,
	email: string
}


const Layout = () => {
	const { t, i18n } = useTranslation();
	const navigate = useNavigate();
	const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

	const handleLogoutClick = () => {
		localStorage.removeItem('token')
		localStorage.removeItem('token_expire_time')
		localStorage.removeItem('user_info')
		navigate('/login');
	};

	useEffect(() => {
		const userInfoString = localStorage.getItem('user_info');
		const userInfo = userInfoString ? JSON.parse(userInfoString) : null;
		setUserInfo(userInfo)
	}, [])

	const onClick: MenuProps['onClick'] = ({ key }) => {
		console.log('dsafdsafdas', key)
		i18n.changeLanguage(key)
	};


	const items: MenuProps['items'] = [
		{
			label: "English",
			key: 'en'
		},
		{
			label: "中文",
			key: 'zh'
		}
	]


	return (
		<>
			<div className="header bg-blue-tifanni">
				<div>logo</div>
				<div>
					{/*<select onChange={(evt) => {*/}
					{/*	i18n.changeLanguage(evt.target.value)*/}
					{/*}}>*/}
					{/*	{Object.keys(lngs).map((lng) => (*/}
					{/*		<option*/}
					{/*			key={lng}*/}
					{/*			value={lng}*/}
					{/*			label={lngs[lng].nativeName}*/}
					{/*			style={{fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal'}}*/}
					{/*		></option>*/}
					{/*	))}*/}
					{/*</select>*/}
					<Dropdown menu={{items, onClick }} trigger={['click']}>
						<Button type={"text"} icon={<GlobalOutlined />} onClick={e => e.preventDefault()} />
					</Dropdown>
					<span>{userInfo ? userInfo.username : ''}</span>
					{/*<p>{t('currentTime', {time: dayjs('2033-4-21').format("MM/DD/YYYY")})}</p>*/}
					<Button type={"text"} onClick={handleLogoutClick}>{userInfo ? t('logout') : t("login")}</Button>
				</div>
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
