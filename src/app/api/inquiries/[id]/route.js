import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

async function getAuthenticatedClient() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user ? supabase : null;
}

export async function GET(request, { params }) {
  const { id } = await params;

  try {
    const supabase = await getAuthenticatedClient();
    if (!supabase) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    // Fetch inquiry
    const { data: inquiry, error: inqError } = await supabase
      .from('inquiries')
      .select('*')
      .eq('id', id)
      .single();

    if (inqError) throw inqError;

    // Fetch notes
    const { data: notes, error: notesError } = await supabase
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
  const { id } = await params;

  try {
    const body = await request.json();
    const { status, consultationDate } = body;

    const supabase = await getAuthenticatedClient();
    if (!supabase) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    const updates = {};
    if (status !== undefined) updates.status = status;
    if (consultationDate !== undefined) updates.consultation_date = consultationDate ? consultationDate : null;

    const { data, error } = await supabase
      .from('inquiries')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    // Insert note tracking the update
    if (status !== undefined) {
      await supabase.from('inquiry_notes').insert([
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
