'use client';

import { Button, useDisclosure } from '@nextui-org/react';
import { useState } from 'react';

import ModalCategory from './modal-category';
import ModalProduct from './modal-product';

export function CreateCategoryProduct() {
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

  return (
    <div className="">
      {addProduct && (
        <ModalProduct isOpen={isOpenProduct} onClose={onCloseProduct} />
      )}
      {addCategory && (
        <ModalCategory isOpen={isOpenCategory} onClose={onCloseCategory} />
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
