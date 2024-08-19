import styled from "styled-components";
import React from "react";
import {Spin} from "antd";
interface OverlayProps {
	loading: boolean
}
const OverlayWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.7);
  z-index: 10;
`;

const Overlay: React.FC<OverlayProps> = ({ loading }) => {
	return loading ? (
		<OverlayWrapper>
			<Spin />
		</OverlayWrapper>
	) : null;
}

export default Overlay;
