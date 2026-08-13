import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function GET(request) {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json({ success: true, data: [] }, { status: 200 });
    }

    const { data, error } = await supabaseAdmin
      .from('faqs')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) throw error;

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error('API Get FAQs Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { question, answer, category, published } = body;

    if (!question || !answer || !category) {
      return NextResponse.json({ success: false, error: 'Question, answer, and category are required' }, { status: 400 });
    }

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json({ success: false, error: 'Supabase admin not configured' }, { status: 400 });
    }

    // Get current count for ordering
    const { count } = await supabaseAdmin
      .from('faqs')
      .select('*', { count: 'exact', head: true });

    const { data, error } = await supabaseAdmin
      .from('faqs')
      .insert([
        {
          question,
          answer,
          category,
          sort_order: count || 0,
          published: published !== undefined ? !!published : true,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error('API Create FAQ Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
