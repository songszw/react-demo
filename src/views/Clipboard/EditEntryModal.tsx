import React, {useEffect, useState} from "react";
import {Button, Form, Input, message, Modal, Select, Space } from "antd";
import useClipboardApi from "@/api/modules/clipboard";
import {Entry, Category} from "@/types/entryInterfaces";
import Overlay from "@/components/Overlay";


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
	const { getEntryById, updateEntry, addNewEntry } = useClipboardApi();
	const [loading, setLoading] = useState(false);
	const [form] = Form.useForm();
	const fetchEntry = async () => {
		if (entryId) {
			setLoading(true)
			const entry = await getEntryById(entryId)
			form.setFieldsValue(entry.data);
			setLoading(false)
		} else {
			form.resetFields()
		}
	}

	useEffect(() => {
		if (visible && entryId) {
			fetchEntry()
		}

	}, [visible, entryId])


	const onFinish = async (values: Entry) => {
		setLoading(true)
		try {
			if (entryId) {
				values.id = entryId;
				await updateEntry(values);
			} else {
				await addNewEntry(values)
			}
			message.open({type: 'success', content: 'success'})
			onEdit();
			handleCloseClick();
		} catch (e) {
			console.log('error', e)
		} finally {
			setLoading(false)
		}
	}

	const handleCloseClick = () => {
		form.resetFields();
		onClose()
	}

	return (
		<>
			<Modal title={"Edit Entry"} open={visible} onCancel={handleCloseClick} footer={false} maskClosable={false}>
				<Overlay loading={loading} />
				<Form
					form={form}
					onFinish={onFinish}
					layout={"vertical"}
					initialValues={{'title': '', content: '', category_id: null}}
				>
					<Form.Item label={"title"} name={"title"} rules={[{required: true, message: "Please input the title"}]}>
						<Input />
					</Form.Item>
					<Form.Item label={"Content"} name={"content"} rules={[{required: true, message: "Please input your content"}]}>
						<Input.TextArea rows={4} />
					</Form.Item>
					<Form.Item
						label={"Category"}
						name={"category_id"}
						rules={[{required: true, message: "Please select a category"}]}
					>
						<Select placeholder={"Select a category"}>
							{categoryList.map(category => (
								<Select.Option key={category.id} value={category.id}>{category.name}</Select.Option>
							))}
						</Select>
					</Form.Item>
					<Form.Item style={{display: "flex",  justifyContent: "end"}}>
						<Space>
							<Button key={'cancel'} onClick={handleCloseClick}>Cancel</Button>
							<Button key={"submit"} type={"primary"} htmlType="submit" >Save</Button>
						</Space>
					</Form.Item>
				</Form>
			</Modal>
		</>
	)
}

export default EditEntryModal;
