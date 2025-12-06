import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Razorpay from 'razorpay';
import dbConnect from '@/lib/mongodb';
import Course from '@/models/Course';
import User from '@/models/User';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { courseId } = await req.json();
    await dbConnect();

    const course = await Course.findById(courseId);
    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    const user = await User.findOne({ email: session.user.email });
    if (user.purchasedCourses.includes(courseId)) {
      return NextResponse.json({ error: 'Already purchased' }, { status: 400 });
    }

    const order = await razorpay.orders.create({
      amount: course.price * 100,
      currency: 'USD',
      receipt: `rcpt_${Date.now()}`,
      notes: {
        courseId,
        userId: user._id.toString(),
      },
    });

    return NextResponse.json({ 
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      courseName: course.title,
    }, { status: 200 });
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
