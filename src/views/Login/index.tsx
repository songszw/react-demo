import { Form, Input, Button } from 'antd';
import './index.less'

const Login = () => {
	const onFinish = (values: { email: string; password: string }) => {
		console.log('Received values of form: ', values);
		// 在这里处理登录逻辑，例如调用API
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
				<Form.Item
					label="Email"
					name="email"
					rules={[{ required: true, message: 'Please input your email!' }, { type: 'email', message: 'Please enter a valid email!' }]}
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
					<Button type="primary" htmlType="submit" block>
						Login
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default Login;
