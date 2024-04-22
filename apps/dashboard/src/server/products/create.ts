import { API_URL } from '@/lib/env';
import { useSession } from 'next-auth/react';

export interface INewProduct {
  name: string;
  description: string;
  price: number;
  image: string;
  category: string[];
  stock: number;
  published: boolean;
}

export const createProduct = async (data: INewProduct) => {
  const session = useSession();
  const response = await fetch(`${API_URL}/user/user/public`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.data?.user.accessToken}`,
      'X-Custom-Token': 'true',
    },
    body: JSON.stringify(data),
  });

  if (response.status !== 201) {
    return false;
  }

  return true;
};
