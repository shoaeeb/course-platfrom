import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Course from '@/models/Course';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    await dbConnect();
    
    const course = await Course.create(body);
    return NextResponse.json({ course }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create course' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    await dbConnect();
    await Course.findByIdAndDelete(id);
    
    return NextResponse.json({ message: 'Course deleted' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete course' }, { status: 500 });
  }
}
