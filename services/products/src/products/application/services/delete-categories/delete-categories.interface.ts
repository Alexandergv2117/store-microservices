export interface IDeleteCategoriesServices {
  deleteCategories(data: { id: string; categories: string[] }): Promise<void>;
}
