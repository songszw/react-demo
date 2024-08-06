// import {Suspense} from "react";
// import {Outlet, NavLink} from "react-router-dom";

import {useTranslation, Trans} from "react-i18next";
import dayjs from "dayjs";
import {Button, Card, Col, Row, Tooltip} from "antd";

import './index.less'
import title_img from '@/assets/img.png';
import {useNavigate} from "react-router-dom";


const lngs :{
	[key: string]: { nativeName: string}
}= {
	en: {nativeName: "English"},
	zh: {nativeName: "中文"}
}
const Home = () => {
	const { t, i18n } = useTranslation()
	const navigate = useNavigate()
	const cardList = [
		{
			title: 'Todo List',
			description: 'This is a todo list',
			imgSrc: title_img,
			router: 'todolist'
		},
		{
			title: 'Clipboard',
			description: 'This is a clipboard',
			imgSrc: title_img,
			router: 'clipboard'
		},
		{
			title: '二维不规则装箱',
			description: 'This is a Bin-packing problem ',
			imgSrc: title_img,
			router: 'binPacking'
		},
		{
			title: 'Clipboard',
			description: 'This is a clipboard',
			imgSrc: title_img,
			router: 'clipboard'
		},
		{
			title: 'Clipboard',
			description: 'This is a clipboard',
			imgSrc: title_img,
			router: 'clipboard'
		},
		{
			title: 'Clipboard',
			description: 'This is a clipboard',
			imgSrc: title_img,
			router: 'clipboard'
		},
		{
			title: 'Clipboard',
			description: 'This is a clipboard',
			imgSrc: title_img,
			router: 'clipboard'
		},
		{
			title: 'Clipboard',
			description: 'This is a clipb oardc lipboa rdclip board clipb oard',
			imgSrc: title_img,
			router: 'clipboard'
		},
		{
			title: 'Clipboard',
			description: 'This is a clipboard',
			imgSrc: title_img,
			router: 'clipboard'
		},
		{
			title: 'Todo List with a really really long title that should be truncated',
			description: 'This is a todo list with a description that is also very long and should be displayed with an ellipsis if it is too long.',
			imgSrc: title_img,
			router: 'clipboard'
		},
		{
			title: 'Clipboard',
			description: 'This is a clipboardclipboardclipboard',
			imgSrc: title_img,
			router: 'clipboard'
		}
	]

	const handleCardClick = (router: string) => {
		navigate(`/${router}`)
	};

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
			<div className="main">
				<Row gutter={[16, 24]} justify={"start"}>
					{cardList.map((card) => (
						<Col xs={24} sm={12} md={8} lg={6} xl={4} xxl={3}>
							<Card
								hoverable
								cover={<img alt={card.title} src={card.imgSrc} />}
								onClick={() => handleCardClick(card.router)}
							>
								<Tooltip title={card.title} placement="topLeft">
									<div className={"card-title card"}>{card.title}</div>
								</Tooltip>
								<Tooltip title={card.description} color={"bg-blue-tifanni"}>
									<div className={"card"}>{card.description}</div>
								</Tooltip>
							</Card>
						</Col>
						))}
				</Row>
			</div>
		</>
	)
}

export default Home


