import { UpdateProductDto } from '../../dto/update-product.dto';

export interface IUpdateProductService {
  updateProduct(data: {
    productId: string;
    updateProduct: UpdateProductDto;
  }): Promise<void>;
}
