export interface CategoryModel {
  id: string,
  name: string,
  defaultCategory: boolean
}

export const EMPTY_CATEGORY: CategoryModel = {
    id: '',
    name: '',
    defaultCategory: false,
}
