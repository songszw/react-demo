import React, { useEffect, useState} from "react";
import useClipboardApi from "@/api/modules/clipboard";
import {
	CaretRightOutlined, SettingOutlined, DeleteOutlined, EditOutlined, PlusOutlined, BorderInnerOutlined
} from '@ant-design/icons';
import {Button, Card, Collapse, message, Modal, Space } from "antd";
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Masonry from "react-masonry-css";

import './index.less'
import {Entry, Category} from "@/types/entryInterfaces";
import EditEntryModal from "@/views/Clipboard/EditEntryModal";
import EditCategoryModal from "@/views/Clipboard/EditCategoryModal";
import FloatingActionButton from "@/components/FloatingActionButton";
import {useTranslation} from "react-i18next";


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

const Clipboard: React.FC = () => {
	const { getEntryListWithCategory, getCategoryList, deleteEntry, deleteCategory } = useClipboardApi();
	const [data, setData] = useState<ResponseData | null > (null);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [currentEntryId, setCurrentEntryId] = useState<number | null>(null);
	const [categoryList, setCategoryList] = useState<Category[]>([]);

	const [categoryId, setCategoryId] = useState<number | null>(null);
	const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false)

	const { t } = useTranslation();

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
			setCategoryList(response.rows);
		} catch (error) {
			console.error("Failed to fetch category list:", error);
		}
	};

	useEffect(() => {
		fetchData()
		fetchCategoryList()
	}, [])

	if (!data) {
		return <div>loading...</div>
	}


	const success = () => {
		message.success(t('message.copySuccess'))
	}


	// 点击类目编辑后 可以操作词条信息 （编辑、删除）
	const toggleEdit = (categoryId: number) => {
		setData(prevData => {
			if(prevData) {
				const newRows = prevData.rows.map(category => ({
					...category,
					isEdit: category.id === categoryId ? !category.isEdit : category.isEdit,
				}))
				return {...prevData, rows: newRows}
			}
			return prevData
		})
	}

	const handleDeleteCategory = (category: CategoryData) => {
		Modal.confirm({
			title: t('text.delete'),
			content: t('message.deleteCategoryMessage', {title: category.name}),
			okText: t('button.confirm'),
			cancelText: t('button.cancel'),
			onOk: async () => {
				if(category.entry_list.length) {
					message.error(t('message.deleteCategoryError_Entry', {title: category.name}))
					return
				}
				deleteCategory(category.id).then(() => {
					message.success(t('message.success'));
					fetchData();
				}).catch(() => {})
			},
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
							toggleEdit(category.id);
							event.stopPropagation();
						}}
					></Button>
					<Button
						type={"text"}
						icon={<EditOutlined />}
						onClick={(event) => {
							setCategoryId(category.id)
							setIsCategoryModalVisible(true)
							event.stopPropagation()
						}}
					></Button>
					<Button
						type={"text"}
						icon={<DeleteOutlined />}
						onClick={(event) => {
							handleDeleteCategory(category);
							event.stopPropagation();
						}}
					></Button>
				</Space>
			</div>
		)
	}

	const breakpointColumnsObj = {
		default: 7,
		2000: 6,
		1700: 5,
		1400: 4,
		1100: 3,
		800: 2,
		500: 1
	};

	const items = data.rows.map(category => ({
		key: category.id,
		label: category.name,
		children: (
			<div style={{ display: "flex" }}>
				<Masonry
					breakpointCols={breakpointColumnsObj}
					className="my-masonry-grid"
					columnClassName="my-masonry-grid_column"
				>
					{category.entry_list.length > 0 ? (
						category.entry_list.map(entry => (
							<div key={entry.id}>
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
							</div>
						))
					) : (
						<p>No entries available</p>
					)}
				</Masonry>
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
			title: t('text.delete'),
			content: t('message.deleteEntryMessage', {title: entry.title}),
			okText: t('button.confirm'),
			cancelText: t('button.cancel'),
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

	const closeCategoryModal = () => {
		setIsCategoryModalVisible(false);
		setCategoryId(null);
	}

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
			<EditCategoryModal
				visible={isCategoryModalVisible}
				categoryId={categoryId}
				onClose={closeCategoryModal}
				onEdit={handleEdit}
			></EditCategoryModal>


			<FloatingActionButton
				additionalButtons={[
					{
						name: t('text.addEntry'),
						icon: <PlusOutlined />,
						onClick: () => {
							setIsModalVisible(true)
						}
					},
					{
						name: t('text.addCategory'),
						icon: <BorderInnerOutlined />,
						onClick: () => {
							setIsCategoryModalVisible(true)
						}
					}
				]}
			></FloatingActionButton>
		</>
	)
}

export default Clipboard
