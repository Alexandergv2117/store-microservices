'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from '@nextui-org/react';

import { API_URL } from '@/lib/env';

interface ModalCategoryProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalCategory({ isOpen, onClose }: ModalCategoryProps) {
  const session = useSession();
  const [message, setMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    const newCategory = {
      category: data.categoryName,
      description: data.categoryDescription,
    };

    const res = await fetch(`${API_URL}/product/category`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.data?.user.accessToken}`,
        'X-Custom-Token': 'true',
      },
      body: JSON.stringify(newCategory),
    });

    if (res.status !== 201) {
      setMessage('Something went wrong');
    }

    setMessage('');
    onClose();
  });

  return (
    <Modal size="lg" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => {
          return (
            <>
              <ModalHeader className="flex flex-col gap-1 items-center uppercase">
                <h2 className="text-lg">Add New Category</h2>
                {message && <p className="text-red-500">{message}</p>}
              </ModalHeader>
              <ModalBody>
                <form
                  onSubmit={onSubmit}
                  className="flex flex-col space-y-4 m-2"
                >
                  <Input
                    type="text"
                    label="Name"
                    isInvalid={!!errors.categoryName}
                    errorMessage={
                      errors.categoryName && 'Category Name is required'
                    }
                    {...register('categoryName', { required: true })}
                  />
                  <Input
                    type="text"
                    label="Description"
                    isInvalid={!!errors.categoryDescription}
                    errorMessage={
                      errors.categoryDescription &&
                      'Category Description is required'
                    }
                    {...register('categoryDescription', { required: true })}
                  />
                  <div className="flex justify-end">
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="success" variant="light" type="submit">
                      Save
                    </Button>
                  </div>
                </form>
              </ModalBody>
            </>
          );
        }}
      </ModalContent>
    </Modal>
  );
}
