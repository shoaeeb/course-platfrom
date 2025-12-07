import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import './globals.css';
import Navbar from '@/components/Navbar';
import AuthProvider from '@/components/AuthProvider';
import GoogleAnalytics from '@/components/GoogleAnalytics';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Course Platform - Learn Coding with Expert Video Tutorials',
  description: 'Master programming skills with our comprehensive video courses. Purchase once, learn forever. Expert-led tutorials in JavaScript, Python, React, and more.',
  keywords: 'coding courses, programming tutorials, learn to code, online courses, video tutorials, web development, software engineering',
  authors: [{ name: 'Course Platform' }],
  openGraph: {
    title: 'Course Platform - Learn Coding with Expert Video Tutorials',
    description: 'Master programming skills with our comprehensive video courses',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <GoogleAnalytics />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen bg-gray-50">
            {children}
          </main>
          <footer className="bg-gray-800 text-white py-8 mt-12">
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="font-bold text-lg mb-4">Course Platform</h3>
                  <p className="text-gray-400 text-sm">Learn coding with expert video tutorials</p>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-4">Legal</h3>
                  <ul className="space-y-2 text-sm">
                    <li><a href="/terms" className="text-gray-400 hover:text-white">Terms & Conditions</a></li>
                    <li><a href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                    <li><a href="/refund" className="text-gray-400 hover:text-white">Refund Policy</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-4">Contact</h3>
                  <p className="text-gray-400 text-sm">support@courseplatform.com</p>
                </div>
              </div>
              <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
                <p>&copy; {new Date().getFullYear()} Course Platform. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
