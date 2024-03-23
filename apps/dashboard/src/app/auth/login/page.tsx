'use client';

import { Button, Input } from '@nextui-org/react';
import { useForm } from 'react-hook-form';

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
  });

  return (
    <main className="h-[calc(100vh-7rem)] flex flex-col justify-center items-center m-4">
      <h1 className="font-bold text-4xl">Login</h1>
      <form
        onSubmit={onSubmit}
        className="flex lg:w-1/5 md:w-2/5 flex-col space-y-4 m-2"
      >
        <Input
          type="email"
          label="Email"
          isInvalid={!!errors.email}
          errorMessage={errors.email && 'Email is required'}
          {...register('email', { required: true })}
        />
        <Input
          type="password"
          label="Password"
          minLength={8}
          isInvalid={!!errors.password}
          errorMessage={
            errors.password && 'Password is required or password is too short'
          }
          {...register('password', { required: true })}
        />
        <Button type="submit" color="primary" variant="ghost">
          Login
        </Button>
      </form>
    </main>
  );
}
