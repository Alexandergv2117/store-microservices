'use client';

import { Button } from '@nextui-org/react';
import { signOut } from 'next-auth/react';

export default function DashboardPage() {
  return (
    <main className="h-[calc(100vh-7rem)] flex flex-col justify-center items-center m-4">
      <h1 className="font-bold text-4xl">Dashboard</h1>
      <Button onClick={() => signOut()}>Click me</Button>
    </main>
  );
}
