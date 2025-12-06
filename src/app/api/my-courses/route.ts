import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import Course from '@/models/Course';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const user = await User.findOne({ email: session.user.email }).populate('purchasedCourses');

    return NextResponse.json({ courses: user.purchasedCourses || [] }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 });
  }
}
