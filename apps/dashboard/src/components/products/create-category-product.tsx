'use client';

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  VisuallyHidden,
  tv,
  useCheckbox,
  useDisclosure,
  Chip,
} from '@nextui-org/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';

import { CheckIcon } from '../ui/icons/CheckIcon';
import { API_URL } from '@/lib/env';

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

export function CreateCategoryProduct() {
  const session = useSession();

  const [message, setMessage] = useState('');
  const [addProduct, setAddProduct] = useState(false);
  const [addCategory, setAddCategory] = useState(false);
  const {
    isOpen: isOpenProduct,
    onOpen: onOpenProduct,
    onClose: onCloseProduct,
  } = useDisclosure();
  const {
    isOpen: isOpenCategory,
    onOpen: onOpenCategory,
    onClose: onCloseCategory,
  } = useDisclosure();

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

  const onSubmitProduct = handleSubmit(async (data) => {
    const newProduct = {
      name: data.productName,
      description: data.productDescription,
      image: data.productImage,
      price: data.productPrice,
      published: isSelected,
      currency: 'MXN',
      stock: parseInt(data.productStock),
      category: [data.productCategory],
    };

    const res = await fetch(`${API_URL}/product/product`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.data?.user.accessToken}`,
        'X-Custom-Token': 'true',
      },
      body: JSON.stringify(newProduct),
    });

    if (res.status !== 201) {
      setMessage('Something went wrong');
    }
    setMessage('');
    onCloseProduct();
  });

  const onSubmitCategory = handleSubmit(async (data) => {
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
    onCloseCategory();
  });

  return (
    <div className="">
      {addProduct && (
        <Modal size="lg" isOpen={isOpenProduct} onClose={onCloseProduct}>
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
                      onSubmit={onSubmitProduct}
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
                        type="text"
                        label="Image"
                        isInvalid={!!errors.productImage}
                        errorMessage={
                          errors.productImage && 'Image is required'
                        }
                        {...register('productImage', { required: true })}
                      />
                      <Input
                        type="number"
                        label="Price"
                        isInvalid={!!errors.productPrice}
                        errorMessage={
                          errors.productPrice && 'Price is required'
                        }
                        {...register('productPrice', { required: true })}
                      />
                      <Input
                        type="number"
                        label="Stock"
                        isInvalid={!!errors.productStock}
                        errorMessage={
                          errors.productStock && 'Stock is required'
                        }
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
                        <Button
                          color="danger"
                          variant="light"
                          onPress={onClose}
                        >
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
      )}
      {addCategory && (
        <Modal size="lg" isOpen={isOpenCategory} onClose={onCloseCategory}>
          <ModalContent>
            {(onClose) => {
              return (
                <>
                  <ModalHeader className="flex flex-col gap-1 items-center uppercase">
                    Add Category
                  </ModalHeader>
                  <ModalBody>
                    <form
                      onSubmit={onSubmitCategory}
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
                        <Button
                          color="danger"
                          variant="light"
                          onPress={onClose}
                        >
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
      )}
      <div className="absolute bottom-6 right-6 flex gap-4 items-center">
        <Button
          color="primary"
          aria-label="Add product"
          onClick={() => {
            onOpenProduct();
            setAddCategory(false);
            setAddProduct(true);
          }}
        >
          Add Product
        </Button>
        <Button
          color="secondary"
          aria-label="Add category"
          onClick={() => {
            onOpenCategory();
            setAddProduct(false);
            setAddCategory(true);
          }}
        >
          Add Category
        </Button>
      </div>
    </div>
  );
}
