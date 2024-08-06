import {useTranslation} from "react-i18next";
import {Button} from "antd";

const Manage = () => {
	const {t} = useTranslation()
	return (
		<div>
			<div>This is manage page</div>
			<Button type={"primary"}>{t('login')}</Button>
		</div>
	)
}

export default Manage
