import {useNavigate} from "react-router-dom";
import axiosInstance from "@/api/axiosInstance";
import {message} from "antd";

const useAxios = () => {
	const navigate = useNavigate()
	const request = async (config: any) => {
		try {
			const response = await axiosInstance(config)
			if (response.data.code === 40103) {
				localStorage.removeItem('token')
				navigate('/login')
				throw new Error('Token is invalid')
			}
			if(response.data.code !== 200) {
				throw new Error(response.data.message || 'Request failed with non-200 status code');
			}
			return response.data
		} catch (error: any) {
			if (error.response && error.response.status === 401) {
				message.error('Token 已过期，请重新登录');
				localStorage.removeItem('token');
				navigate('/login');
			} else if(error.response && error.response.data.detail) {
				message.error(error.response.data.detail);
			} else if (error.message) {
				message.error(error.message);
			} else {
				message.error('请求失败，未知错误');
			}

			throw error;
		}
	}
	return {request}
}

export default useAxios;
