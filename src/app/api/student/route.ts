import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/utils/db';

export async function GET() {
  const res = await query('SELECT * FROM student', []);
  return NextResponse.json(res.rows);
}

export async function POST(req: NextRequest) {
  try {
    const { name, email } = await req.json();
    if (!name || !email) {
      throw new Error('Missing required fields');
    }
    await query('INSERT INTO student (name, email) VALUES ($1, $2)', [name, email]);
    return NextResponse.json({ message: 'Student created' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, name, email } = await req.json();
    if (!id || !name || !email) {
      throw new Error('Missing required fields');
    }
    await query('UPDATE student SET name = $1, email = $2 WHERE id = $3', [name, email, id]);
    return NextResponse.json({ message: 'Student updated' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id) {
      throw new Error('Missing student ID');
    }
    await query('DELETE FROM student WHERE id = $1', [id]);
    return NextResponse.json({ message: 'Student deleted' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
