import { Form, Input, Button } from 'antd';
import './index.less'
import {useNavigate} from "react-router-dom";
import useLoginApi from "@/api/modules/login";

const Login = () => {
	const {login} = useLoginApi()
	const navigate = useNavigate()
	const onFinish = async (values: { username: string; password: string }) => {
		try {
			const res = await login(values)
			const token: string = res.data.access_token
			const expireTime = Date.now() + 1800000;
			localStorage.setItem('token', token);
			localStorage.setItem('token_expire_time', expireTime.toString());
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
					label="username"
					name="username"
					rules={[
						{ required: true, message: 'Please input your username!' }
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label="Password"
					name="password"
					rules={[{ required: true, message: 'Please input your password!' }]}
				>
					<Input.Password />
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit" block >
						Login
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default Login;
