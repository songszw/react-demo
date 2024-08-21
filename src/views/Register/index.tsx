import {useTranslation} from "react-i18next";
import {Button, Form, Input, message} from "antd";
import './index.less';
import useLoginApi from "@/api/modules/login";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const Register = () => {
	const { t } =  useTranslation();
	const [loading, setLoading] = useState(false)
	const { register } = useLoginApi();
	const navigate = useNavigate();

	const onFinish = async (values: {username: string, password: string, rePassword: string, email: string}) => {
		try {
			if(values.password !== values.rePassword) {
				message.error(t('message.passwordNotMatch'))
				return false;
			}
			// {
			// 	"username": "test001",
			// 	"password": "password",
			// 	"email": "c@c.com"
			// }
			const params = {
				username: values.username,
				password: values.password,
				email: values.email
			}
			setLoading(true)
			register(params).then(() => {
				message.success(t('message.registerSuccess'))
				setLoading(false)
				navigate('/login')
			}).catch(() => {
				setLoading(false)
			})
		} catch (e) {
			console.log('error', e)
		}
	}

	return (
		<div className={'register-container'}>
			<h2>{t('register')}</h2>
			<Form name={'register'} onFinish={onFinish} layout={"vertical"} style={{width: 400, margin: "0 auto"}}>
				<Form.Item
					label={t('form.username')}
					name={"username"}
					rules={[{required: true, message: t('form.usernameMessage')}]}
				>
					<Input placeholder={t('form.username')}></Input>
				</Form.Item>
				<Form.Item
					label={t('form.email')}
					name={'email'}
					rules={[
						{type: 'email', message: t('form.emailValidate')},
						{required: true, message: t('form.emailMessage')},
					]}
				>
					<Input placeholder={t('form.email')}></Input>
				</Form.Item>
				<Form.Item
					label={t('form.password')}
					name={'password'}
					rules={[{required: true, message: t('form.passwordMessage')}]}
				>
					<Input.Password placeholder={t('form.password')}></Input.Password>
				</Form.Item>
				<Form.Item
					label={t('form.rePassword')}
					name={'rePassword'}
					rules={[{required: true, message: t('form.rePasswordMessage')}]}
				>
					<Input.Password placeholder={t('form.rePasswordMessage')}></Input.Password>
				</Form.Item>
				<Form.Item>
					<Button type={"primary"} htmlType={"submit"} block loading={loading}>{t('register')}</Button>
					<span>{t('text.hasAccount')}<a href="/login">{t('login')}</a></span>
				</Form.Item>

			</Form>
		</div>
	)
}

export default Register;
