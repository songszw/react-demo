import axios from "axios";

const config = {
	baseURL: import.meta.env.VITE_API_URL as string,
	timeout:  10000,
	withCredentials: true
}
const axiosInstance = axios.create(config)


// 添加请求拦截器
axiosInstance.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('token')
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	error => {
		return Promise.reject(error)
	}
)

// 添加响应拦截器
axiosInstance.interceptors.response.use(
	(response) => {
		return response
	},
	(error) => {
		return Promise.reject(error)
	}
)
// axiosInstance.interceptors.response.use(
// 	(response) => {
// 		const navigate = useNavigate(); // 使用 useNavigate()
//
// 		if (response.data.code === 40103) {
// 			// token错误， 退回登录页
// 			console.log('token is invalid')
// 			localStorage.removeItem('token')
// 			localStorage.removeItem('token_expire_time')
// 			navigate('/login'); // 跳转到登录页
// 			return false
//
// 		}
// 		return response
// 	},
// 	error => {
// 		if(error.response && error.response.status === 401) {
// 			localStorage.removeItem('token')
// 			console.log('this is error page and push to login')
// 			// navigate('/login'); // 使用外部设置的 navigate
// 		}
// 		return Promise.reject(error)
// 	}
// )

export default axiosInstance

