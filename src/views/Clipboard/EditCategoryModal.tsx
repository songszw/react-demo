import React, {useEffect, useState} from "react";
import {Button, Form, Input, message, Modal, Space} from "antd";
import useClipboardApi from "@/api/modules/clipboard";
import Overlay from "@/components/Overlay";
import {Category} from "@/types/entryInterfaces";

interface EditCategoryModalProps {
	visible: boolean;
	categoryId: number | null;
	onClose: () => void;
	onEdit: () => void
}

const EditCategoryModal: React.FC<EditCategoryModalProps> = (
	{
		visible,
		categoryId,
		onClose,
		onEdit
	}
) => {
	const { getCategoryById, addNewCategory, updateCategory } = useClipboardApi()
	const [loading, setLoading] = useState(false);
	const [form] =  Form.useForm();

	const fetchCategory = async () => {
		if (categoryId) {
			setLoading(true)
			const category = await getCategoryById(categoryId)
			form.setFieldsValue(category.data)
			setLoading(false)
		} else {
			form.resetFields();
		}
	}

	useEffect(() => {
		if (visible && categoryId) {
			fetchCategory();
		}
	}, [visible, categoryId])

	const onFinish = async (values: Category) => {
		setLoading(true)
		try {
			if (categoryId) {
				values.id = categoryId
				await updateCategory(values)
			} else {
				await addNewCategory(values)
			}
			message.success('success');
			onEdit()
			handleCloseClick()
		} catch (e) {
		} finally {
			setLoading(false)
		}
	}

	const handleCloseClick = () => {
		form.resetFields();
		onClose();
	}

	return (
		<Modal title={"Edit Category"} open={visible} onCancel={handleCloseClick} footer={false} maskClosable={false}>
			<Overlay loading={loading}></Overlay>
			<Form form={form} onFinish={onFinish} layout={'vertical'} initialValues={{"name": ""}}>
				<Form.Item label={"name"} name={"name"} rules={[{required: true, message: "Please input category name"}]}>
					<Input />
				</Form.Item>
				<Form.Item style={{display: "flex", justifyContent: "end"}}>
					<Space>
						<Button key={"cancel"} onClick={handleCloseClick}>Cancel</Button>
						<Button key={"submit"} type={"primary"} htmlType={"submit"}>Save</Button>
					</Space>
				</Form.Item>
			</Form>
		</Modal>
	)
}

export default EditCategoryModal
