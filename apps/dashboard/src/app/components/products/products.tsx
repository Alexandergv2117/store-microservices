'use client';

import { useCallback } from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
} from '@nextui-org/react';

import { DeleteIcon } from '@/app/components/ui/icons/delete-icon';
import { EditIcon } from '@/app/components/ui/icons/edit-icon';
import { EyeIcon } from '@/app/components/ui/icons/eye-icon';
import { users } from './data';

type User = (typeof users)[0];

const columns = [
  { name: 'NAME', uid: 'name' },
  { name: 'PRICE', uid: 'price' },
  { name: 'STATUS', uid: 'published' },
  { name: 'STOCK', uid: 'stock' },
  { name: 'ACTIONS', uid: 'actions' },
];

export default function Products() {
  const renderCell = useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];

    switch (columnKey) {
      case 'name':
        return (
          <User
            avatarProps={{ radius: 'lg', src: user.image }}
            name={cellValue}
          />
        );
      case 'price':
        return (
          <span key={user.id}>
            ${cellValue} {user.currency}
          </span>
        );
      case 'published':
        return (
          <Chip
            className="capitalize"
            color={cellValue ? 'success' : 'danger'}
            size="sm"
            variant="flat"
          >
            {cellValue ? 'published' : 'draft'}
          </Chip>
        );
      case 'actions':
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <section className="w-8/12">
      <Table aria-label="Example table with custom cells">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === 'actions' ? 'center' : 'start'}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={users}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </section>
  );
}
