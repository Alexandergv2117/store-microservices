import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { API_URL } from './env';

export const getToken = async () => {
  const session = await getServerSession(authOptions);
  return session?.user.accessToken || '';
};

export const GET = async (url: string) => {
  const res = await fetch(`${API_URL}${url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${await getToken()}`,
      'X-Custom-Token': 'true',
    },
    cache: 'no-cache',
  });

  const data = await res.json();

  return data;
};

export const POST = async (url: string, data: unknown) => {
  const res = await fetch(`${API_URL}${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${await getToken()}`,
      'X-Custom-Token': 'true',
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  return result;
};
