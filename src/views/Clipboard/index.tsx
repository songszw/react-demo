import { useEffect, useState} from "react";
import useClipboardApi from "@/api/modules/clipboard";
import { CaretRightOutlined, SettingOutlined, DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {Button, Card, Col, Collapse, message, Modal, Row, Space} from "antd";
import { CopyToClipboard } from 'react-copy-to-clipboard'

import './index.less'
import {Entry, Category} from "@/types/entryInterfaces";
import EditEntryModal from "@/views/Clipboard/EditEntryModal";


interface CategoryData {
	name: string;
	id: number;
	entry_list: Entry[];
	total: number;
	isEdit: boolean;
}

interface ResponseData {
	code: number;
	total: number;
	rows: CategoryData[];
}

const Clipboard = () => {
	const { getEntryListWithCategory, getCategoryList, deleteEntry } = useClipboardApi();
	const [data, setData] = useState<ResponseData | null > (null);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [currentEntryId, setCurrentEntryId] = useState<number | null>(null);
	const [categoryList, setCategoryList] = useState<Category[]>([])

	const fetchData = async () => {
		try {
			const response = await getEntryListWithCategory();
			setData(response);
		} catch (error) {
			setData(null);
		}
	};

	const fetchCategoryList = async () => {
		try {
			const response = await getCategoryList();
			setCategoryList(response);
		} catch (error) {
			console.error("Failed to fetch category list:", error);
		}
	};

	useEffect(() => {
		fetchData()
		fetchCategoryList()
		// (async () => {
		// 	try {
		// 		const response = await getEntryListWithCategory()
		// 		// const response = await axiosInstance.get<ResponseData>('/api/v1/entry/by_category')
		// 		setData(response)
		// 	} catch (error) {
		// 		console.log('error', error)
		// 	}
		// })()
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


	// 点击类目编辑后 可以操作词条信息 （编辑、删除）
	const toggleEdit = (categoryId: number) => {
		setData(prevData => {
			if(prevData) {
				const newRows = prevData.rows.map(category => {
					if(category.id === categoryId) {
						return{
							...category,
							isEdit: !category.isEdit
						}
					}
					return category
				})
				return {...prevData, rows: newRows}
			}
			return prevData
		})
	}

	const genExtra = (category: CategoryData) => {
		return (
			<div style={{display: "flex"}}>
				<Space>
					<Button
						type={"text"}
						icon={<SettingOutlined />}
						onClick={(event) => {
							toggleEdit(category.id)
							event.stopPropagation()
						}}
					></Button>
					<Button
						type={"text"}
						icon={<DeleteOutlined />}
						onClick={(event) => {
							event.stopPropagation()
						}}
					></Button>
				</Space>
			</div>
		)
	}


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
									actions={category.isEdit ? [
										<EditOutlined
											key="edit"
											onClick={() => showEditModal(entry.id)}
										/>,
										<DeleteOutlined key="delete" onClick={() => handleDeleteEntry(entry)} />,
									] : []}
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
		extra: genExtra(category),
	}));



	const showEditModal = (entryId: number) => {
		setCurrentEntryId(entryId);
		setIsModalVisible(true);
	};

	const handleDeleteEntry = (entry: Entry) => {
		Modal.confirm({
			title: 'Delete',
			content: `Delete entry ${entry.title} ?`,
			okText: '确认',
			cancelText: '取消',
			onOk() {
				return new Promise<void>((resolve, reject) => {
					deleteEntry(entry.id).then(() => {
						message.success(`Entry "${entry.title}" deleted successfully!`)
						fetchData()
						resolve()
					}).catch(() => {
						reject()
					})
				})
			},
		})
	}

	const closeModal = () => {
		setIsModalVisible(false);
		setCurrentEntryId(null); // 清除当前词条 ID
	};

	const handleEdit = () => {
		fetchData(); // 关闭弹窗后刷新数据
	};

	return (
		<>
			<Collapse
				className={"collapse-wrapper"}
				bordered={false}
				collapsible="icon"
				defaultActiveKey={items.map(item => item.key)} // 可选：默认展开所有面板
				expandIcon={
					({ isActive }) => <Button
						type={"text"}
						icon={<CaretRightOutlined rotate={isActive ? 90 : 0} />}
					></Button>
				}
				items={items}
				ghost
				expandIconPosition={"end"}
			></Collapse>
			<EditEntryModal
				visible={isModalVisible}
				entryId={currentEntryId}
				onClose={closeModal}
				onEdit={handleEdit}
				categoryList={categoryList}
			/>
		</>
	)
}

export default Clipboard
