import {useEffect, useState} from "react";
import useClipboardApi from "@/api/modules/clipboard";
import { CaretRightOutlined, SettingOutlined } from '@ant-design/icons';
import { Card, Col, Collapse, message, Row} from "antd";
import { CopyToClipboard } from 'react-copy-to-clipboard'


// 定义数据结构
interface Entry {
	title: string;
	content: string;
	status: number;
	category_id: number;
	id: number;
}

interface Category {
	name: string;
	id: number;
	entry_list: Entry[];
	total: number;
}

interface ResponseData {
	code: number;
	total: number;
	rows: Category[];
}

const Clipboard = () => {
	const { getEntryListWithCategory } = useClipboardApi();

	const [data, setData] = useState<ResponseData | null > (null)
	useEffect(() => {
		(async () => {
			try {
				const response = await getEntryListWithCategory()
				// const response = await axiosInstance.get<ResponseData>('/api/v1/entry/by_category')
				setData(response)
			} catch (error) {
				console.log('error', error)
			}
		})()
	}, [])

	if (!data) {
		return <div>loading...</div>
	}


	const success = () => {
		message.open({
			type: 'success',
			content: 'copy success'
		})
	}

	const genExtra = () => (
		<div style={{display: "flex"}}>
			<SettingOutlined
				onClick={(event) => {
					console.log('click')
					event.stopPropagation()
				}}
			/>

		</div>
	)


	const items = data.rows.map(category => ({
		key: category.id,
		label: category.name,
		children: (
			<div style={{display: "flex", flexWrap: "wrap"}}>
				<Row gutter={[16, 24]} justify={"start"} style={{width: "100%"}}>
					{category.entry_list.length > 0 ? (
						category.entry_list.map(entry => (
							<Col xs={24} sm={12} md={8} xl={4} xxl={3} key={entry.id}>
								<Card
									type="inner"
									hoverable
									title={entry.title}
								>
									<CopyToClipboard
										text={entry.content}
										onCopy={success}
									>
										<div style={{ cursor: 'pointer' }}>{entry.content}</div>
									</CopyToClipboard>
								</Card>
							</Col>
						))
					) : (
						<p>No entries available</p>
					)}
				</Row>
			</div>
		),
		extra: genExtra(),
	}));

	return (
		<>
			<Collapse
				bordered={false}
				defaultActiveKey={items.map(item => item.key)} // 可选：默认展开所有面板
				expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
				expandIconPosition={'end'}
				items={items}
				ghost
			/>
		</>
	)
}

export default Clipboard
