import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request, { params }) {
  const { id } = await params;

  try {
    const body = await request.json();
    const { content } = body;

    if (!content) {
      return NextResponse.json({ success: false, error: 'Content is required' }, { status: 400 });
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    const { data, error } = await supabase
      .from('inquiry_notes')
      .insert([
        {
          inquiry_id: id,
          content,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, data }, { status: 200 });

  } catch (error) {
    console.error(`API Create Inquiry Note (${id}) Error:`, error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
