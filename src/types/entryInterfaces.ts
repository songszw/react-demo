export interface Entry {
	title: string;
	content: string;
	status: number;
	category_id: number;
	id: number;
}

export interface Category {
	name: string;
	status: number;
	id: number
}
