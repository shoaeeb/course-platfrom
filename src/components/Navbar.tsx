'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          CoursePlatform
        </Link>
        
        <div className="flex gap-4 items-center">
          <Link href="/" className="hover:text-blue-600">All Courses</Link>
          
          {session ? (
            <>
              <Link href="/my-courses" className="hover:text-blue-600">My Courses</Link>
              {session.user.isAdmin && (
                <Link href="/admin" className="hover:text-blue-600">Admin</Link>
              )}
              <span className="text-gray-600">{session.user.name}</span>
              <button onClick={() => signOut()} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-blue-600">Login</Link>
              <Link href="/register" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
