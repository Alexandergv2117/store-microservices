import { API_URL } from '@/lib/env';

interface User {
  username: string;
  password: string;
  name: string;
  lastname: string;
  image: File;
  email: string;
  phone: string;
}

export const createUser = async (data: User) => {
  const formData = new FormData();

  formData.append('username', data.username);
  formData.append('password', data.password);
  formData.append('name', data.name);
  formData.append('lastname', data.lastname);
  formData.append('image', data.image);
  formData.append('email', data.email);
  formData.append('phone', data.phone);
  formData.append('role', 'admin');

  const response = await fetch(`${API_URL}/user/public`, {
    method: 'POST',
    headers: {},
    body: formData,
  });

  const result = await response.json();

  if (response.status !== 201) {
    return false;
  }

  return result;
};
