'use client';

import { createUser } from '@/server/users/create';
import { Button, Input } from '@nextui-org/react';
import { useForm } from 'react-hook-form';

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    const result = await createUser(data);
    console.log(result);
  });

  return (
    <div className="flex items-center flex-col">
      <h1>Register</h1>
      <form
        onSubmit={onSubmit}
        className="flex lg:w-1/5 md:w-2/5 flex-col space-y-4 m-2"
      >
        <Input
          type="text"
          label="Username"
          isInvalid={!!errors.username}
          errorMessage={errors.username && 'Username is required'}
          {...register('username', { required: true })}
        />
        <Input
          type="text"
          label="Name"
          isInvalid={!!errors.name}
          errorMessage={errors.name && 'Name is required'}
          {...register('name', { required: true })}
        />
        <Input
          type="text"
          label="Lastname"
          isInvalid={!!errors.lastname}
          errorMessage={errors.lastname && 'Lastname is required'}
          {...register('lastname', { required: true })}
        />
        <Input
          type="email"
          label="Email"
          isInvalid={!!errors.email}
          errorMessage={errors.email && 'Email is required'}
          {...register('email', { required: true })}
        />
        <Input
          type="phone"
          label="Phone"
          isInvalid={!!errors.phone}
          errorMessage={errors.phone && 'Phone is required'}
          {...register('phone', { required: true })}
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
        <Input
          type="password"
          label="Confirm Password"
          minLength={8}
          isInvalid={!!errors['confirm-password']}
          errorMessage={
            errors['confirm-password'] &&
            'Confirm password is required or confirm password is too short'
          }
          {...register('confirm-password', { required: true })}
        />
        <Button type="submit" color="primary" variant="ghost">
          Register
        </Button>
      </form>
    </div>
  );
}

export default RegisterPage;
