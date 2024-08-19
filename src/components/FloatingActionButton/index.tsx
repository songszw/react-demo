import {FloatButton, Tooltip} from "antd";
import {ArrowUpOutlined, HomeOutlined, SlackOutlined} from "@ant-design/icons";
import React from "react";

interface AdditionalButton {
	icon: React.ReactNode;
	name: string;
	onClick: () =>  void;
}

interface FloatingActionButtonProps {
	additionalButtons?: AdditionalButton[];
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({additionalButtons = []}) => {
	return (
		<FloatButton.Group trigger={"click"} icon={<SlackOutlined />}>
			{additionalButtons.map( (button, index) => (
				<Tooltip title={button.name} color={'rgb(129, 216, 208)'} key={index} placement={"left"}>
					<FloatButton key={index} icon={button.icon} onClick={button.onClick}></FloatButton>
				</Tooltip>
			))}
			<Tooltip title={"回到顶部"} color={'rgb(129, 216, 208)'} key={"ToTop"} placement={"left"}>
				<FloatButton icon={<ArrowUpOutlined />} onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} />
			</Tooltip>
			<Tooltip title={"回到首页"} color={'rgb(129, 216, 208)'} key={"ToHome"} placement={"left"}>
				<FloatButton icon={<HomeOutlined />} onClick={() => window.location.href = '/'} />
			</Tooltip>
		</FloatButton.Group>
	)
}

export default FloatingActionButton
