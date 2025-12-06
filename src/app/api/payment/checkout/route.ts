import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
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

    const paymentId = `pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    await Purchase.create({
      userId: user._id,
      courseId,
      amount: course.price,
      paymentId,
    });

    user.purchasedCourses.push(courseId);
    await user.save();

    course.enrolledCount += 1;
    await course.save();

    return NextResponse.json({ success: true, paymentId }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Payment failed' }, { status: 500 });
  }
}
