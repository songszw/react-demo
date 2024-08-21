import {useTranslation} from "react-i18next";
import {Button, Form, Input, message, Modal, Space} from "antd";
import React, {useState} from "react";
import Overlay from "@/components/Overlay";
import useLoginApi from "@/api/modules/login";

interface ChangePasswordModalProps {
	visible: boolean;
	onClose: () => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({visible, onClose}) => {
	const { t } = useTranslation();
	const [ form ] = Form.useForm();
	const [loading, setLoading] = useState(false);
	const { changePassword } =  useLoginApi();

	const onFinish = async (values: {current_password: string, new_password: string}) => {
		try {
			setLoading(true)
			await changePassword(values);
			message.success(t('message.success'))
			setLoading(false)
			onClose()
		} catch (e) {
			setLoading(false)
		}
	}

	const handleCloseClick = () => {
		form.resetFields();
		onClose()
	}

	return (
		<>
			<Modal
				title={t('text.changePassword')}
				open={visible}
				onCancel={handleCloseClick}
				footer={false}
				maskClosable={false}
			>
				<Overlay loading={loading}></Overlay>
				<Form
					form={form}
					onFinish={onFinish}
					layout={"vertical"}
					initialValues={{'current_password': '', 'new_password': ''}}
				>
					<Form.Item
						label={t('form.currentPassword')}
						name={'current_password'}
						rules={[{required: true, message: t('form.passwordMessage')}]}
					>
						<Input.Password placeholder={t('form.password')}></Input.Password>
					</Form.Item>
					<Form.Item
						label={t('form.newPassword')}
						name={'new_password'}
						rules={[{required: true, message: t('form.passwordMessage')}]}
					>
						<Input.Password placeholder={t('form.password')}></Input.Password>
					</Form.Item>
					<Form.Item style={{display: "flex", justifyContent: "end"}}>
						<Space>
							<Button key={'cancel'} onClick={handleCloseClick}>{t('button.cancel')}</Button>
							<Button key={"submit"} type={"primary"} htmlType="submit" >{t('button.save')}</Button>
						</Space>
					</Form.Item>
				</Form>
			</Modal>
		</>
	)
}


export default ChangePasswordModal
