'use client';

import { createUser } from '@/server/users/create';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

function RegisterPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [errorMessage, setErrorMessage] = useState({ title: '', message: '' });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    const result = await createUser({
      username: data.username,
      password: data.password,
      name: data.name,
      lastname: data.lastname,
      image: data.image[0],
      email: data.email,
      phone: data.phone,
    });

    if (!result) {
      setErrorMessage({
        title: 'oops! Something went wrong!',
        message: 'User already exists',
      });
      onOpen();
    } else {
      setErrorMessage({
        title: 'Success!',
        message: 'User created successfully!',
      });
      onOpen();
    }
  });

  return (
    <div className="flex items-center flex-col">
      <Modal size="lg" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {errorMessage.title}
              </ModalHeader>
              <ModalBody>
                <p>{errorMessage.message}</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
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
          type="file"
          isInvalid={!!errors.image}
          errorMessage={errors.image && 'Image is required'}
          {...register('image', { required: true })}
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
        <Button type="submit" color="primary" variant="ghost">
          Register
        </Button>
      </form>
    </div>
  );
}

export default RegisterPage;
