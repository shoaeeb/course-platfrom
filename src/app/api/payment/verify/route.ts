import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import crypto from 'crypto';
import dbConnect from '@/lib/mongodb';
import Course from '@/models/Course';
import User from '@/models/User';
import Purchase from '@/models/Purchase';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courseId } = await req.json();

    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(sign.toString())
      .digest('hex');

    if (razorpay_signature !== expectedSign) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    await dbConnect();

    const course = await Course.findById(courseId);
    const user = await User.findOne({ email: session.user.email });

    await Purchase.create({
      userId: user._id,
      courseId,
      amount: course.price,
      paymentId: razorpay_payment_id,
    });

    user.purchasedCourses.push(courseId);
    await user.save();

    course.enrolledCount += 1;
    await course.save();

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json({ error: 'Payment verification failed' }, { status: 500 });
  }
}
