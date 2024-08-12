import useAxios from "@/api/useAxios";

interface LoginData {
	username: string;
	password: string
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
	return {login}
}

export default useLoginApi;
