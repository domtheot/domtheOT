import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function GET(request, { params }) {
  const { id } = params;

  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json({ success: false, error: 'Supabase admin not configured' }, { status: 400 });
    }

    // Fetch inquiry
    const { data: inquiry, error: inqError } = await supabaseAdmin
      .from('inquiries')
      .select('*')
      .eq('id', id)
      .single();

    if (inqError) throw inqError;

    // Fetch notes
    const { data: notes, error: notesError } = await supabaseAdmin
      .from('inquiry_notes')
      .select('*')
      .eq('inquiry_id', id)
      .order('created_at', { ascending: true });

    if (notesError) throw notesError;

    return NextResponse.json({ success: true, data: { ...inquiry, notes } }, { status: 200 });

  } catch (error) {
    console.error(`API Get Inquiry Detail (${id}) Error:`, error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  const { id } = params;

  try {
    const body = await request.json();
    const { status, consultationDate } = body;

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json({ success: false, error: 'Supabase admin not configured' }, { status: 400 });
    }

    const updates = {};
    if (status !== undefined) updates.status = status;
    if (consultationDate !== undefined) updates.consultation_date = consultationDate ? consultationDate : null;

    const { data, error } = await supabaseAdmin
      .from('inquiries')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    // Insert note tracking the update
    if (status !== undefined) {
      await supabaseAdmin.from('inquiry_notes').insert([
        {
          inquiry_id: id,
          content: `Status updated to "${status}"`,
        },
      ]);
    }

    return NextResponse.json({ success: true, data }, { status: 200 });

  } catch (error) {
    console.error(`API Patch Inquiry (${id}) Error:`, error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
