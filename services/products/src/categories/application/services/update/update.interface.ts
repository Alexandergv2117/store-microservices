import { UpdateCategoryDTO } from '../../dto/update.dto';

export interface IUpdateOneCategoryService {
  id: string;
  category: UpdateCategoryDTO;
}

export interface IUpdateCategoryService {
  updateOne(data: IUpdateOneCategoryService): Promise<void>;
}
