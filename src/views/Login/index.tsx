import { Form, Input, Button } from 'antd';
import './index.less'
import {useNavigate} from "react-router-dom";
import useLoginApi from "@/api/modules/login";
import useUserApi from "@/api/modules/home";
import {useTranslation} from "react-i18next";

const Login = () => {
	const {login} = useLoginApi();
	const navigate = useNavigate();
	const { t } = useTranslation();

	const { getUserInfo } = useUserApi();

	const getUser = async () => {
		const response = await getUserInfo()
		const userInfo = JSON.stringify(response.data)
		localStorage.setItem('user_info', userInfo)
	}

	const onFinish = async (values: { username: string; password: string }) => {
		try {
			const res = await login(values)
			const token: string = res.data.access_token
			const expireTime = Date.now() + 1800000;
			localStorage.setItem('token', token);
			localStorage.setItem('token_expire_time', expireTime.toString());
			await getUser()
			navigate('/');
		} catch (error) {
			console.log(error)
		}
	};

	return (
		<div className="login-container">
			<h2>Login</h2>
			<Form
				name="login"
				onFinish={onFinish}
				layout="vertical"
				style={{ maxWidth: 400, margin: '0 auto' }}
			>
				{/*<Form.Item*/}
				{/*	label="Email"*/}
				{/*	name="email"*/}
				{/*	rules={[*/}
				{/*		{ required: true, message: 'Please input your email!' },*/}
				{/*		{ type: 'email', message: 'Please enter a valid email!' }*/}
				{/*	]}*/}
				{/*>*/}
				{/*	<Input />*/}
				{/*</Form.Item>*/}
				<Form.Item
					label={t('form.username')}
					name="username"
					rules={[
						{ required: true, message: t('form.usernameMessage') }
					]}
				>
					<Input placeholder={t("form.username")} />
				</Form.Item>
				<Form.Item
					label={t("form.password")}
					name="password"
					rules={[{ required: true, message: t('form.passwordMessage') }]}
				>
					<Input.Password placeholder={t('form.password')} />
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit" block >{t('login')}</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default Login;
