import useAxios from "@/api/useAxios";


const useUserApi = () => {
	const { request } = useAxios();

	const getUserInfo = async () => {
		const response = await request({
			method: 'GET',
			url: '/api/v1/user'
		})
		return response
	}

	return {
		getUserInfo
	}
}

export default useUserApi;
