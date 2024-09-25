import React from "react";
import {Form, FormProps, Input, Checkbox, Button, message} from "antd";
import {useTranslation} from "react-i18next";
import CryptoJS from 'crypto-js';

type FieldType = {
	website?: string;
	salt?: string;
	symbol?: boolean;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
	try {
		const password = generatePassword(values.website, values.salt, values.symbol);
		navigator.clipboard.writeText(password).then(() => {
			message.success(`Password copied to clipboard！`)
		})
	} catch (error) {
		console.log('error', error)
	}
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
	console.log('errorInfo', errorInfo)
};

const generatePassword = (website?: string, salt?: string, includeSymbols: boolean = true): string => {
	if(!website || !salt) {
		throw new Error('Website and salt are required')
	}

	const combined = website + salt;
	const hashed = CryptoJS.SHA256(combined).toString(CryptoJS.enc.Hex);
	const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	const lower = 'abcdefghijklmnopqrstuvwxyz';
	const digits = '0123456789';
	const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

	const allChars = upper + lower + digits + (includeSymbols ? symbols : '');

	let password = '';
	for (let i=0; i<16; i++) {
		const index = parseInt(hashed.substr(i*2, 2), 16) % allChars.length;
		password += allChars[index];
	}

	const requiredChars = [
		upper[parseInt(hashed.substr(0, 2), 16) % upper.length],
		lower[parseInt(hashed.substr(2,2), 16) % lower.length],
		digits[parseInt(hashed.substr(4,2),16) % digits.length]
	];

	if (includeSymbols) {
		requiredChars.push(symbols[parseInt(hashed.substr(6,2),16) % symbols.length]);
	}
	password = requiredChars.concat(password.slice(requiredChars.length)).join('');

	return password;


}

const Password: React.FC = () => {
	const { t } = useTranslation();
	return (
		<>
			<Form
				name = 'basic'
				labelCol={{span: 8}}
				style={{width: 400, margin: '0 auto'}}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				initialValues={{symbol: true}}
				autoComplete={"off"}
			>
				<Form.Item
					label={t('form.website')}
					name={'website'}
					rules={[{required: true, message: t('form.websiteMessage')}]}
				>
					<Input placeholder={t('form.websiteMessage')}></Input>
				</Form.Item>
				<Form.Item
					label={t('form.salt')}
					name={'salt'}
					rules={[{required: true, message: t('form.saltMessage')}]}
				>
					<Input placeholder={t('form.saltMessage')}></Input>
				</Form.Item>
				<Form.Item
					label={t('form.symbol')}
					name={'symbol'}
					rules={[{required: true}]}
					valuePropName={"checked"}
				>
					<Checkbox></Checkbox>
				</Form.Item>
				<Form.Item wrapperCol={{span: 16, offset: 8}}>
					<Button type={"primary"} htmlType={"submit"}  block>
						{t('button.confirm')}
					</Button>
				</Form.Item>
			</Form>
		</>
	)
}

export default Password;
