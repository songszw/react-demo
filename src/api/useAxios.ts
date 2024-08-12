import {useNavigate} from "react-router-dom";
import axiosInstance from "@/api/axiosInstance";

const useAxios = () => {
	const navigate = useNavigate()
	const request = async (config: any) => {
		try {
			const response = await axiosInstance(config)
			if (response.data.code === 40013) {
				localStorage.removeItem('token')
				navigate('/login')
				throw new Error('Token is invalid')
			}
			return response.data
		} catch (error: any) {
			if(error.response && error.response.status === 401) {
				localStorage.removeItem('token')
				navigate('/login')
			}
			throw error
		}
	}
	return {request}
}

export default useAxios;
