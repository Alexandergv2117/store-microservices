'use client';

import { useState } from 'react';
import { CheckIcon } from '../ui/icons/CheckIcon';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { API_URL } from '@/lib/env';
import {
  Button,
  Chip,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  VisuallyHidden,
  tv,
  useCheckbox,
} from '@nextui-org/react';

const checkbox = tv({
  slots: {
    base: 'border-default hover:bg-default-200',
    content: 'text-default-500',
  },
  variants: {
    isSelected: {
      true: {
        base: 'border-primary bg-primary hover:bg-primary-500 hover:border-primary-500',
        content: 'text-primary-foreground pl-1',
      },
    },
    isFocusVisible: {
      true: {
        base: 'outline-none ring-2 ring-focus ring-offset-2 ring-offset-background',
      },
    },
  },
});

interface ModalProductProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalProduct({ isOpen, onClose }: ModalProductProps) {
  const session = useSession();
  const [message, setMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { children, isSelected, isFocusVisible, getBaseProps, getInputProps } =
    useCheckbox({
      defaultSelected: true,
    });

  const styles = checkbox({ isSelected, isFocusVisible });

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();
    formData.append('name', data.productName);
    formData.append('description', data.productDescription);
    formData.append('price', data.productPrice);
    formData.append('currency', 'MXN');
    formData.append('image', data.productImage[0]);
    formData.append('categories', data.productCategory);
    formData.append('stock', data.productStock);
    formData.append('published', data.isSelected);

    const res = await fetch(`${API_URL}/product`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session.data?.user.accessToken}`,
      },
      body: formData,
    });

    if (!res) {
      setMessage('Something went wrong');
      return;
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
                Add Product
              </ModalHeader>
              <ModalBody>
                <div>
                  {message && (
                    <div className="bg-danger text-white p-2 rounded-md">
                      {message}
                    </div>
                  )}
                </div>
                <form
                  onSubmit={onSubmit}
                  className="flex flex-col space-y-4 m-2"
                >
                  <Input
                    type="text"
                    label="Name"
                    isInvalid={!!errors.productName}
                    errorMessage={
                      errors.productName && 'Product name is required'
                    }
                    {...register('productName', { required: true })}
                  />
                  <Input
                    type="text"
                    label="Description"
                    isInvalid={!!errors.productDescription}
                    errorMessage={
                      errors.productDescription &&
                      'Product Description is required'
                    }
                    {...register('productDescription', { required: true })}
                  />
                  <Input
                    type="file"
                    isInvalid={!!errors.productImage}
                    errorMessage={errors.productImage && 'Image is required'}
                    {...register('productImage', { required: true })}
                  />
                  <Input
                    type="number"
                    label="Price"
                    isInvalid={!!errors.productPrice}
                    errorMessage={errors.productPrice && 'Price is required'}
                    {...register('productPrice', { required: true })}
                  />
                  <Input
                    type="number"
                    label="Stock"
                    isInvalid={!!errors.productStock}
                    errorMessage={errors.productStock && 'Stock is required'}
                    {...register('productStock', { required: true })}
                  />
                  <Input
                    type="text"
                    label="Category"
                    isInvalid={!!errors.productCategory}
                    errorMessage={
                      errors.productCategory && 'Category is required'
                    }
                    {...register('productCategory', { required: true })}
                  />
                  <label {...getBaseProps()}>
                    <VisuallyHidden>
                      <input {...getInputProps()} />
                    </VisuallyHidden>
                    <Chip
                      classNames={{
                        base: styles.base(),
                        content: styles.content(),
                      }}
                      color="primary"
                      startContent={
                        isSelected ? <CheckIcon className="ml-1" /> : null
                      }
                      variant="faded"
                    >
                      {children
                        ? children
                        : isSelected
                          ? 'Published'
                          : 'Unpublished'}
                    </Chip>
                  </label>
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
