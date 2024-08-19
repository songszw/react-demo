import { Card, Col, Row, Tooltip} from "antd";

import './index.less'
import title_img from '@/assets/img.png';
import {useNavigate} from "react-router-dom";

const Home = () => {
	const navigate = useNavigate();

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
			<Row gutter={[16, 24]} justify={"start"}>
				{cardList.map((card, index) => (
					<Col xs={24} sm={12} md={8} lg={6} xl={4} xxl={3} key={index}>
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
		</>
	)
}

export default Home


