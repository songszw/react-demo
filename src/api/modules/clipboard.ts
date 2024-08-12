import useAxios from "@/api/useAxios";

const useClipboardApi = () => {
	const {request} = useAxios()

	const getEntryListWithCategory = async (params = {}) => {
		const response = await request({
			method: 'GET',
			url: '/api/v1/entry/by_category',
			params
		})
		return response
	}
	return {getEntryListWithCategory}
}
export default useClipboardApi;
