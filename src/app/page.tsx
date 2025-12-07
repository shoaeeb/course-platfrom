import { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: 'Learn Coding - Expert Video Tutorials | Course Platform',
  description: 'Browse our collection of coding courses. Learn JavaScript, Python, React, Node.js and more with expert-led video tutorials. Purchase once, access forever.',
  openGraph: {
    title: 'Learn Coding - Expert Video Tutorials',
    description: 'Browse our collection of coding courses',
  },
};

export default function Home() {
  return <HomeClient />;
}
