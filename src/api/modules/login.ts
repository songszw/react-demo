import useAxios from "@/api/useAxios";

interface LoginData {
	username: string;
	password: string
}

interface RegisterData {
	username: string;
	password: string;
	email: string;
}

interface changPasswordData {
	current_password: string;
	new_password: string
}

const useLoginApi = () => {
	const {request} = useAxios()

	const login = async (data: LoginData) => {
		const response = await request({
			method: 'POST',
			url: '/api/v1/user/login',
			data: data
		})
		return response
	}

	const register = async (data: RegisterData) => {
		const response = await request({
			method: "POST",
			url: "/api/v1/user/register",
			data: data
		})
		return response
	}

	const changePassword = async (data: changPasswordData) => {
		const response = await request({
			method: 'PUT',
			url: "/api/v1/user/password",
			data: data
		})
		return response
	}

	return { login, register, changePassword }
}

export default useLoginApi;
