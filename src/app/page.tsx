'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiSearch, FiUsers } from 'react-icons/fi';

const getYouTubeThumbnail = (url: string) => {
  const videoId = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/)?.[1];
  return videoId ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` : null;
};

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, [search]);

  const fetchCourses = async () => {
    setLoading(true);
    const res = await fetch(`/api/courses?search=${search}`);
    const data = await res.json();
    setCourses(data.courses);
    setLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Learn Coding</h1>
        <p className="text-gray-600 mb-6">Master programming with expert video tutorials</p>
        <div className="relative max-w-2xl">
          <FiSearch className="absolute left-4 top-4 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course: any) => {
            const thumbnail = getYouTubeThumbnail(course.videoUrl);
            return (
              <Link key={course._id} href={`/courses/${course._id}`}>
                <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden group">
                  <div className="relative aspect-video bg-gray-200">
                    {thumbnail && (
                      <Image
                        src={thumbnail}
                        alt={course.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                    <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full font-bold text-sm">
                      ${course.price}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-blue-600 transition">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span className="bg-gray-100 px-3 py-1 rounded-full">{course.level}</span>
                      <div className="flex items-center gap-1">
                        <FiUsers size={16} />
                        <span>{course.enrolledCount}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
