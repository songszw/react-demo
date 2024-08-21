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

	return {login, register}
}

export default useLoginApi;
