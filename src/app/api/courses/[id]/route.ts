import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Course from '@/models/Course';
import User from '@/models/User';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);
    
    const course = await Course.findById(params.id);
    
    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    let hasPurchased = false;
    if (session?.user?.email) {
      const user = await User.findOne({ email: session.user.email });
      hasPurchased = user?.purchasedCourses?.includes(params.id) || false;
    }

    return NextResponse.json({ course, hasPurchased }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch course' }, { status: 500 });
  }
}
