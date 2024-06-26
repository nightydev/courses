import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/utils/db';

export async function GET() {
  const res = await query('SELECT * FROM inscription', []);
  return NextResponse.json(res.rows);
}

export async function POST(req: NextRequest) {
  try {
    const { course_id, student_id, date } = await req.json();
    if (!course_id || !student_id || !date) {
      throw new Error('Missing required fields');
    }
    await query('INSERT INTO inscription (course_id, student_id, date) VALUES ($1, $2, $3)', [course_id, student_id, date]);
    return NextResponse.json({ message: 'Inscription created' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, course_id, student_id, date } = await req.json();
    if (!id || !course_id || !student_id || !date) {
      throw new Error('Missing required fields');
    }
    await query('UPDATE inscription SET course_id = $1, student_id = $2, date = $3 WHERE id = $4', [course_id, student_id, date, id]);
    return NextResponse.json({ message: 'Inscription updated' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id) {
      throw new Error('Missing inscription ID');
    }
    await query('DELETE FROM inscription WHERE id = $1', [id]);
    return NextResponse.json({ message: 'Inscription deleted' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
