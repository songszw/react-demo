import React, {useState} from "react";
import {Form, FormProps, Input, Checkbox, Button, message, Row, Col, Card, Avatar, Space} from "antd";
import {useTranslation} from "react-i18next";
import CryptoJS from 'crypto-js';
import FloatingActionButton from "@/components/FloatingActionButton";
import Meta from "antd/es/card/Meta";
import {CopyToClipboard} from "react-copy-to-clipboard";
import './index.less'

type FieldType = {
	website?: string;
	salt?: string;
	symbol?: boolean;
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
	const [password, setPassword] = useState('');
	const { t } = useTranslation();
	const [cardList, setCardList] = useState(
		[{
			title: 'Gmail',
			description: 'Google mail',
			avatar: 'https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico',
			url: 'https://mail.google.com',
			salt: '',
			symbol: true,
			inputType: 'password',
			password: '123'
		},
		{
			title: '网易云音乐',
			description: '网易云音乐',
			avatar: 'https://s1.music.126.net/style/favicon.ico',
			url: 'https://music.163.com',
			salt: '',
			symbol: true,
			inputType: 'text',
			password: ''
		}]
	);

	const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
		try {
			const password = generatePassword(values.website, values.salt, values.symbol);
			setPassword(password);
		} catch (error) {
			console.log('error', error)
		}
	};
	const handleCheckboxChange = (index: number, checked: boolean) => {
		const updateCardList = [...cardList];
		updateCardList[index].symbol = checked;
		setCardList(updateCardList);
	}

	const handleInputChange = (index: number, value: string) => {
		const updateCardList = [...cardList];
		updateCardList[index].salt = value;
		setCardList(updateCardList);
	}

	const handleConfirmClick = (index: number) => {
		try {
			const updateCardList = [...cardList]
			const cardInfo = cardList[index];
			const password = generatePassword(cardInfo.url, cardInfo.salt, cardInfo.symbol);
			updateCardList[index].password = password
			setCardList(updateCardList);
		} catch (e) {
			console.log('error', e)
		}
	}

	return (
		<>
			<Row gutter={[16, 24]} justify={'start'} className={'main'}>
				<Card>
					<Form
						name='basic'
						labelCol={{span: 7}}
						labelAlign={"left"}
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
						<Form.Item label={t('form.password')}>
							<CopyToClipboard
								text={password}
								onCopy={() => {
									message.success(t('message.copySuccess'))
								}
								}>
								<div style={{ cursor: 'pointer' }}>{password}</div>
							</CopyToClipboard>
						</Form.Item>
						<Form.Item>
							<Button type={"primary"} htmlType={"submit"}  block>
								{t('button.confirm')}
							</Button>
						</Form.Item>
					</Form>
				</Card>
				{cardList.map((card, index) => (
					<Col xs={24} sm={12} md={8} lg={6} xl={5} xxl={3} key={index}>
						<Card hoverable>
							<Meta
								style={{alignItems: 'center', padding: '20px'}}
								title={card.title}
								avatar={<Avatar src={card.avatar}  />}
							/>
							<div style={{display: "flex",  flexDirection: "column", margin: "20px 0 0"}}>
								<Space>
									<div className={'card-label'}>{t('form.key')}:</div>
									<Input
										value={card.salt}
										placeholder={t('form.keyMessage')}
										onChange={(e) => handleInputChange(index, e.target.value)}
									/>
								</Space>
								<Space>
									<div className={'card-label'}>{t('form.symbol')}:</div>
									<Checkbox
										checked={card.symbol}
										onChange={(e) => handleCheckboxChange(index, e.target.checked)}
										style={{margin: '15px 0'}}
									></Checkbox>
								</Space>
								<Space>
									<div className={'card-label'}>{t('form.password')}:</div>
									<CopyToClipboard
										text={card.password}
										onCopy={() => {
											message.success(t('message.copySuccess'))
										}
									}>
										<div style={{ cursor: 'pointer' }}>{card.password}</div>
									</CopyToClipboard>
								</Space>
								<Button
									type={"primary"}
									style={{margin:"35px 0 25px"}}
									disabled={!card.salt}
									onClick={() => handleConfirmClick(index)}
								>{t('button.confirm')}</Button>
							</div>
						</Card>
					</Col>
				))}
			</Row>
			<FloatingActionButton />
		</>
	)
}

export default Password;
