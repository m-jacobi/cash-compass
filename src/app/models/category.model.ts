export interface Category {
  id: string,
  name: string,
  defaultCategory: boolean,
}

export const EMPTY_CATEGORY: Category = {
    id: '',
    name: '',
    defaultCategory: false,
}
