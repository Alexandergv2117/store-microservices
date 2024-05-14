'use client';

import { usePathname } from 'next/navigation';
import { signIn, useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Button,
} from '@nextui-org/react';
import { AcmeLogo } from '../ui/icons/acme-icon';

export default function App() {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <Navbar className="bg-slate-100" maxWidth="2xl">
      <NavbarBrand>
        <Link
          href={session ? '/dashboard' : '/'}
          color="foreground"
          className="flex flex-row items-center"
        >
          <AcmeLogo />
          <p className="font-bold text-inherit">ACME</p>
        </Link>
      </NavbarBrand>

      {session && (
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem isActive={pathname === '/dashboard'}>
            <Link href="/dashboard" color="default">
              Dashboard
            </Link>
          </NavbarItem>
          <NavbarItem isActive={pathname === '/users'}>
            <Link href="/users" color="default">
              Users
            </Link>
          </NavbarItem>
          <NavbarItem isActive={pathname === '/products'}>
            <Link href="/products" color="default">
              Products
            </Link>
          </NavbarItem>
        </NavbarContent>
      )}

      <NavbarContent as="div" justify="end">
        {session ? (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="primary"
                name={session?.user?.name || 'Anonymous'}
                size="sm"
                src={session?.user?.image || undefined}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{session?.user?.email}</p>
              </DropdownItem>
              <DropdownItem key="settings">My Settings</DropdownItem>
              <DropdownItem key="team_settings">Team Settings</DropdownItem>
              <DropdownItem key="analytics">Analytics</DropdownItem>
              <DropdownItem key="system">System</DropdownItem>
              <DropdownItem key="configurations">Configurations</DropdownItem>
              <DropdownItem key="help_and_feedback">
                Help & Feedback
              </DropdownItem>
              <DropdownItem
                key="logout"
                color="danger"
                onClick={() => signOut()}
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <>
            {pathname !== '/auth/register' && (
              <NavbarItem>
                <Link href="/auth/register" className="">
                  Sign Up
                </Link>
              </NavbarItem>
            )}
            <NavbarItem>
              <Button color="primary" variant="flat" onClick={() => signIn()}>
                Sign In
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
}
