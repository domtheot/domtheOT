import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

function isConfigured() {
  return process.env.NEXT_PUBLIC_SUPABASE_URL && (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

export async function GET(request) {
  try {
    if (!isConfigured()) {
      return NextResponse.json({ success: true, data: [] }, { status: 200 });
    }

    const supabase = await createClient();

    const publishedOnly = new URL(request.url).searchParams.get('published') === 'true';
    const featuredOnly = new URL(request.url).searchParams.get('featured') === 'true';
    const requestedLimit = Number(new URL(request.url).searchParams.get('limit'));
    let query = supabase
      .from('resources')
      .select('*')
      .order('created_at', { ascending: false });

    if (publishedOnly) query = query.eq('published', true);
    if (featuredOnly) query = query.eq('featured_link', true);
    if (Number.isInteger(requestedLimit) && requestedLimit > 0) query = query.limit(Math.min(requestedLimit, 20));

    const { data, error } = await query;

    if (error) throw error;

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error('API Get Resources Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, category, description, content, published, link_url, featured_link } = body;

    if (!title || !category) {
      return NextResponse.json({ success: false, error: 'Title and category are required' }, { status: 400 });
    }

    if (!isConfigured()) {
      return NextResponse.json({ success: false, error: 'Supabase not configured' }, { status: 400 });
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    if (featured_link) {
      const { count, error: countError } = await supabase
        .from('resources')
        .select('*', { count: 'exact', head: true })
        .eq('featured_link', true);
      if (countError) throw countError;
      if ((count || 0) >= 5) {
        return NextResponse.json({ success: false, error: 'Only five quick-reference links can be designated.' }, { status: 400 });
      }
    }

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const { data, error } = await supabase
      .from('resources')
      .insert([
        {
          title,
          slug,
          category,
          description,
          content: content || '',
          published: !!published,
          link_url: link_url || null,
          featured_link: !!featured_link,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error('API Create Resource Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
