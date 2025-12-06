'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FiPlay, FiClock, FiBarChart2 } from 'react-icons/fi';

const getYouTubeThumbnail = (url: string) => {
  const videoId = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/)?.[1];
  return videoId ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` : null;
};

export default function MyCoursesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated') {
      fetchCourses();
    }
  }, [status]);

  const fetchCourses = async () => {
    const res = await fetch('/api/my-courses');
    const data = await res.json();
    setCourses(data.courses);
    setLoading(false);
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-2">My Courses</h1>
      <p className="text-gray-600 mb-8">Continue learning from your purchased courses</p>

      {courses.length === 0 ? (
        <div className="text-center py-16">
          <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
            <FiPlay size={40} className="text-gray-400" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">No courses yet</h2>
          <p className="text-gray-600 mb-6">Start learning by purchasing your first course</p>
          <Link href="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 inline-block">
            Browse Courses
          </Link>
        </div>
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
                        className="object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition flex items-center justify-center">
                      <div className="bg-blue-600 rounded-full p-4 opacity-0 group-hover:opacity-100 transition">
                        <FiPlay size={24} className="text-white" />
                      </div>
                    </div>
                    <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full font-semibold text-sm">
                      Owned
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold mb-2 line-clamp-2">{course.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
                    <div className="flex gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <FiBarChart2 size={16} />
                        <span>{course.level}</span>
                      </div>
                      {course.duration && (
                        <div className="flex items-center gap-1">
                          <FiClock size={16} />
                          <span>{course.duration}</span>
                        </div>
                      )}
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
