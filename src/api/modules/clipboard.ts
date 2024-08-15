import useAxios from "@/api/useAxios";
import {Entry} from "@/types/entryInterfaces";

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

	// 根据词条id查询词条信息
	const getEntryById = async (entryId: number) => {
		const response = await request({
			method: 'GET',
			url: '/api/v1/entry/'+ entryId
		})
		return response
	}

	// 更新词条
	const updateEntry = async (params: Entry | null) => {
		const response = await request({
			method: 'PUT',
			url: '/api/v1/entry',
			data: params
		})
		return response
	}

	// 获取词条类目
	const getCategoryList = async () => {
		const response = await request({
			method: 'GET',
			url: '/api/v1/category'
		})
		return response
	}

	// 删除词条
	const deleteEntry = async (entryId: number)=> {
		const response = await request({
			method: 'DELETE',
			url: '/api/v1/entry/' + entryId
		})
		return response
	}

	return {getEntryListWithCategory, getEntryById, updateEntry, getCategoryList, deleteEntry}
}
export default useClipboardApi;
