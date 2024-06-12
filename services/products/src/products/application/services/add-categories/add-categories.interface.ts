export interface IAddCategoriesService {
  addCategoriesToProduct(data: {
    id: string;
    categories: string[];
  }): Promise<void>;
}
