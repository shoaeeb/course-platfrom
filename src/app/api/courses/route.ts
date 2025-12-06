import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Course from '@/models/Course';

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search');
    const category = searchParams.get('category');

    let query: any = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    if (category) {
      query.category = category;
    }

    const courses = await Course.find(query).sort({ createdAt: -1 });

    return NextResponse.json({ courses }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 });
  }
}
