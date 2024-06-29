'use client';

import { API_URL } from '@/lib/env';
import { useSession } from 'next-auth/react';

export interface INewProduct {
  name: string;
  description: string;
  price: number;
  image: File;
  category: string[];
  stock: number;
  published: boolean;
}

export const createProduct = async (data: INewProduct) => {
  const session = useSession();

  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('description', data.description);
  formData.append('price', data.price.toString());
  formData.append('image', data.image);
  formData.append('category', JSON.stringify(data.category)); // You might need to handle this differently on the server
  formData.append('stock', data.stock.toString());
  formData.append('published', data.published.toString());

  const response = await fetch(`${API_URL}/product`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${session.data?.user.accessToken}`,
    },
    body: formData,
  });

  if (response.status !== 201) {
    return false;
  }

  return true;
};
