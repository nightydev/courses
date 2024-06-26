import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/utils/db';

export async function GET() {
  const res = await query('SELECT * FROM course', []);
  return NextResponse.json(res.rows);
}

export async function POST(req: NextRequest) {
  try {
    const { name, description, duration } = await req.json();
    if (!name || !description || !duration) {
      throw new Error('Missing required fields');
    }
    await query('INSERT INTO course (name, description, duration) VALUES ($1, $2, $3)', [name, description, duration]);
    return NextResponse.json({ message: 'Course created' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, name, description, duration } = await req.json();
    if (!id || !name || !description || !duration) {
      throw new Error('Missing required fields');
    }
    await query('UPDATE course SET name = $1, description = $2, duration = $3 WHERE id = $4', [name, description, duration, id]);
    return NextResponse.json({ message: 'Course updated' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id) {
      throw new Error('Missing course ID');
    }
    await query('DELETE FROM course WHERE id = $1', [id]);
    return NextResponse.json({ message: 'Course deleted' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
