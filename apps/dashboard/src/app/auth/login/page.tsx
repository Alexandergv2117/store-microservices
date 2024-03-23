'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';

export default function LoginPage() {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [errorMessage, setErrorMessage] = useState({ title: '', message: '' });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (res?.error) {
      setErrorMessage({
        title: 'oops! Something went wrong!',
        message: res.error,
      });
      onOpen();
    } else {
      router.push('/dashboard');
    }
  });

  return (
    <main className="h-[calc(100vh-7rem)] flex flex-col justify-center items-center m-4">
      <Modal size="lg" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => {
            return (
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
            );
          }}
        </ModalContent>
      </Modal>
      <Card className="flex flex-col w-96 justify-center items-center m-4">
        <CardHeader className="flex justify-center items-center">
          <h1 className="font-bold text-4xl">SignIn</h1>
        </CardHeader>
        <CardBody>
          <form onSubmit={onSubmit} className="flex flex-col space-y-4 m-2">
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
                errors.password &&
                'Password is required or password is too short'
              }
              {...register('password', { required: true })}
            />
            <Button type="submit" color="primary" variant="ghost">
              Login
            </Button>
          </form>
        </CardBody>
      </Card>
    </main>
  );
}
