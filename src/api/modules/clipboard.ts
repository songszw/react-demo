import useAxios from "@/api/useAxios";
import {Category, Entry} from "@/types/entryInterfaces";

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

	// 新增词条
	const addNewEntry = async (params: Entry) => {
		const response = await request({
			method: 'POST',
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
	const deleteEntry = async (entryId: number) => {
		const response = await request({
			method: 'DELETE',
			url: '/api/v1/entry/' + entryId
		})
		return response
	}

	// 根据id获取类目信息
	const getCategoryById = async (categoryId: number) => {
		const response = await request({
			method: 'GET',
			url: '/api/v1/category/' + categoryId
		})
		return response
	}

	// 新增类目
	const addNewCategory = async (params: Category) => {
		const response = await request({
			method: 'POST',
			url: '/api/v1/category',
			data: params
		})
		return response
	}

	const updateCategory = async (params: Category) => {
		const response = await request({
			method: 'PUT',
			url: '/api/v1/category',
			data: params
		})
		return response
	}

	const deleteCategory = async (categoryId: number) => {
		const responsoe = await request({
			method: 'DELETE',
			url: '/api/v1/category/'+categoryId
		})
		return responsoe
	}

	return {
		getEntryListWithCategory, getEntryById, updateEntry, getCategoryList, deleteEntry, addNewEntry, getCategoryById,
		addNewCategory, updateCategory, deleteCategory
	}
}
export default useClipboardApi;
