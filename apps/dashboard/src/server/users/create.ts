import { uuidv7 } from 'uuidv7';

export const createUser = async (data: unknown) => {
  (data as { id: string }).id = uuidv7();
  const response = await fetch('http://localhost/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (response.status !== 201) {
    return false;
  }

  return result;
};
