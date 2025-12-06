'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    videoUrl: '',
    price: '',
    category: '',
    level: 'Beginner',
    duration: '',
  });

  useEffect(() => {
    if (session && !session.user.isAdmin) {
      router.push('/');
    }
    fetchCourses();
  }, [session]);

  const fetchCourses = async () => {
    const res = await fetch('/api/courses');
    const data = await res.json();
    setCourses(data.courses);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const res = await fetch('/api/admin/courses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, price: parseFloat(formData.price) }),
    });

    if (res.ok) {
      alert('Course created!');
      setFormData({
        title: '',
        description: '',
        videoUrl: '',
        price: '',
        category: '',
        level: 'Beginner',
        duration: '',
      });
      fetchCourses();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this course?')) return;
    
    await fetch(`/api/admin/courses?id=${id}`, { method: 'DELETE' });
    fetchCourses();
  };

  if (!session?.user.isAdmin) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Add New Course</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 border rounded"
            required
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 border rounded"
            rows={3}
            required
          />
          <input
            type="text"
            placeholder="YouTube Video URL"
            value={formData.videoUrl}
            onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
            className="w-full px-4 py-2 border rounded"
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="w-full px-4 py-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-4 py-2 border rounded"
            required
          />
          <select
            value={formData.level}
            onChange={(e) => setFormData({ ...formData, level: e.target.value })}
            className="w-full px-4 py-2 border rounded"
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
          <input
            type="text"
            placeholder="Duration (e.g., 2 hours)"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            className="w-full px-4 py-2 border rounded"
          />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Create Course
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">All Courses</h2>
        <div className="space-y-4">
          {courses.map((course: any) => (
            <div key={course._id} className="flex justify-between items-center border-b pb-4">
              <div>
                <h3 className="font-semibold">{course.title}</h3>
                <p className="text-sm text-gray-600">${course.price} - {course.enrolledCount} enrolled</p>
              </div>
              <button
                onClick={() => handleDelete(course._id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
