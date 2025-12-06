'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import ReactPlayer from 'react-player';
import Image from 'next/image';
import { FiClock, FiUsers, FiBarChart2, FiTag } from 'react-icons/fi';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const getYouTubeThumbnail = (url: string) => {
  const videoId = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/)?.[1];
  return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;
};

export default function CoursePage({ params }: { params: { id: string } }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [course, setCourse] = useState<any>(null);
  const [hasPurchased, setHasPurchased] = useState(false);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    fetchCourse();
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const fetchCourse = async () => {
    const res = await fetch(`/api/courses/${params.id}`);
    const data = await res.json();
    setCourse(data.course);
    setHasPurchased(data.hasPurchased);
    setLoading(false);
  };

  const handlePurchase = async () => {
    if (!session) {
      router.push('/login');
      return;
    }

    setPurchasing(true);

    try {
      const orderRes = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId: params.id }),
      });

      const orderData = await orderRes.json();

      if (!orderRes.ok) {
        alert(orderData.error);
        setPurchasing(false);
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Course Platform',
        description: orderData.courseName,
        order_id: orderData.orderId,
        handler: async function (response: any) {
          const verifyRes = await fetch('/api/payment/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              courseId: params.id,
            }),
          });

          if (verifyRes.ok) {
            setHasPurchased(true);
            alert('Purchase successful!');
            fetchCourse();
          } else {
            alert('Payment verification failed');
          }
          setPurchasing(false);
        },
        prefill: {
          name: session.user.name,
          email: session.user.email,
        },
        theme: {
          color: '#2563eb',
        },
        modal: {
          ondismiss: function() {
            setPurchasing(false);
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      alert('Payment failed');
      setPurchasing(false);
    }
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;
  if (!course) return <div className="text-center py-12">Course not found</div>;

  const thumbnail = getYouTubeThumbnail(course.videoUrl);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
            {hasPurchased ? (
              <div className="aspect-video bg-black">
                <ReactPlayer url={course.videoUrl} controls width="100%" height="100%" />
              </div>
            ) : (
              <div className="relative aspect-video bg-gray-900">
                {thumbnail && (
                  <Image
                    src={thumbnail}
                    alt={course.title}
                    fill
                    className="object-cover opacity-80"
                  />
                )}
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                  <div className="text-center">
                    <div className="bg-white rounded-full p-6 mb-4 inline-block">
                      <svg className="w-12 h-12 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                      </svg>
                    </div>
                    <p className="text-white text-xl font-semibold">Purchase to unlock this course</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-4xl font-bold mb-4 text-gray-900">{course.title}</h1>
            
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2 text-gray-600">
                <FiBarChart2 className="text-blue-600" />
                <span>{course.level}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <FiUsers className="text-blue-600" />
                <span>{course.enrolledCount} students</span>
              </div>
              {course.duration && (
                <div className="flex items-center gap-2 text-gray-600">
                  <FiClock className="text-blue-600" />
                  <span>{course.duration}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-gray-600">
                <FiTag className="text-blue-600" />
                <span>{course.category}</span>
              </div>
            </div>

            <div className="border-t pt-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">About this course</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{course.description}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
            <div className="text-center mb-6">
              <div className="text-5xl font-bold text-blue-600 mb-2">${course.price}</div>
              <p className="text-gray-600">One-time payment</p>
            </div>

            {!hasPurchased ? (
              <button
                onClick={handlePurchase}
                disabled={purchasing}
                className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed mb-4"
              >
                {purchasing ? 'Processing...' : 'Buy Now'}
              </button>
            ) : (
              <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4 mb-4">
                <p className="text-green-700 font-semibold text-center">✓ You own this course</p>
              </div>
            )}

            <div className="border-t pt-6 space-y-4">
              <h3 className="font-bold text-lg mb-3">This course includes:</h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Full lifetime access</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>HD video content</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Watch on any device</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Learn at your own pace</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
