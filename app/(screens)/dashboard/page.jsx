'use client';

import { useSession, signOut } from 'next-auth/react';
import { LogOut, UserCircle2 } from 'lucide-react';
import { Nunito } from 'next/font/google';


export default function DashboardPage() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="min-h-screen  text-white flex items-center justify-center">
        <p className="text-lg">Access Denied. Please login first.</p>
      </div>
    );
  }

  return (
    <main className=''>
      Hello
    </main>
  );
}
