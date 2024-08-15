import React, {useEffect, useState} from "react";
import {Button, Form, Input, message, Modal, Select, Space} from "antd";
import useClipboardApi from "@/api/modules/clipboard";
import {Entry, Category} from "@/types/entryInterfaces";


interface EditEntryModalProps {
	visible: boolean;
	entryId: number | null;
	onClose: () => void;
	onEdit: () => void;
	categoryList: Category[];
}



const EditEntryModal: React.FC<EditEntryModalProps> = (
	{
		visible,
		entryId,
		onClose,
		onEdit,
		categoryList
	}
) => {
	const { getEntryById, updateEntry } = useClipboardApi()
	const [entry, setEntry] =  useState<Entry | null>(null)
	const fetchEntry = async () => {
		if (entryId) {
			const entry = await getEntryById(entryId)
			setEntry(entry.data)
		} else {
			setEntry(null)
		}
	}

	useEffect(() => {
		if (entryId) {
			fetchEntry()
		}

	}, [visible, entryId])

	if(!entry) {
		return null
	}

	const onFinish = async (values: Entry) => {
		try {
			if (entryId) {

				console.log('values', values)
				console.log('entry',  entry)
				values.id = entryId
				await updateEntry(values);
				message.open({
					type: 'success',
					content: 'success'
				})
				onEdit();
				onClose();
			}
		} catch (e) {
			console.log('error', e)
		}
	}

	return (
		<Modal
			title={"Edit Entry"}
			open={visible}
			onCancel={onClose}
			footer={false}
			maskClosable={false}
			// footer={[
			// 	<Button key={'cancel'} onClick={onClose}>Cancel</Button>,
			// 	<Button key={"submit"} type={"primary"} onClick={handleSubmit}>Save</Button>
			// ]}
		>
			<Form
				onFinish={onFinish}
				layout={"vertical"}
				initialValues={entry || {'title': '', content: ''}}
			>
				<Form.Item
					label={"title"}
					name={"title"}
					rules={[
						{required: true, message: "Please input the title"}
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label={"Content"}
					name={"content"}
					rules={[{required: true, message: "Please input your content"}]}
				>
					<Input.TextArea rows={4} />
				</Form.Item>
				<Form.Item
					label={"Category"}
					name={"category_id"}
					rules={[{required: true, message: "Please select a category"}]}
				>
					<Select
						placeholder={"Select a category"}
					>
						{categoryList.map(category => (
							<Select.Option key={category.id} value={category.id}>
								{category.name}
							</Select.Option>
						))}
					</Select>
				</Form.Item>
				<Form.Item style={{display: "flex",  justifyContent: "end"}}>
					<Space>
						<Button key={'cancel'} onClick={onClose}>Cancel</Button>
						<Button key={"submit"} type={"primary"} htmlType="submit">Save</Button>
						{/*<Button key={"submit"} type={"primary"} onClick={handleSubmit}>Save</Button>*/}
					</Space>
				</Form.Item>
			</Form>
		</Modal>
	)
}

export default EditEntryModal;
