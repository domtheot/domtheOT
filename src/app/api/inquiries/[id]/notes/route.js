import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function POST(request, { params }) {
  const { id } = params;

  try {
    const body = await request.json();
    const { content } = body;

    if (!content) {
      return NextResponse.json({ success: false, error: 'Content is required' }, { status: 400 });
    }

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json({ success: false, error: 'Supabase admin not configured' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
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
