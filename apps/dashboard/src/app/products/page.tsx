import { CreateCategoryProduct } from '@/components/products/create-category-product';
import Products from '@/components/products/products';
import { GET } from '@/lib/fetch';

export default async function ProductsPage() {
  const res = await GET('/product');
  return (
    <main className="flex flex-col justify-center items-center">
      <Products products={res.data} />
      <CreateCategoryProduct />
    </main>
  );
}
