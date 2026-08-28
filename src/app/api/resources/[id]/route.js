import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

function isConfigured() {
  return process.env.NEXT_PUBLIC_SUPABASE_URL && (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

function normalizeReferenceLinks(links) {
  return links.map((link, index) => {
    if (typeof link === 'string') return { title: `Helpful Link ${index + 1}`, url: link.trim() };
    return { title: String(link?.title || '').trim(), url: String(link?.url || '').trim() };
  }).filter((link) => link.url).slice(0, 5);
}

export async function PATCH(request, { params }) {
  try {
    if (!isConfigured()) {
      return NextResponse.json({ success: false, error: 'Supabase not configured' }, { status: 400 });
    }

    const { id } = await params;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    const body = await request.json();
    const allowed = ['title', 'category', 'description', 'content', 'published', 'link_url', 'reference_links', 'featured_link'];
    const updates = Object.fromEntries(allowed.filter((key) => key in body).map((key) => [key, body[key]]));

    if (Array.isArray(updates.reference_links)) {
      updates.reference_links = normalizeReferenceLinks(updates.reference_links);
    }

    if (updates.title) {
      updates.slug = updates.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }

    if (updates.featured_link) {
      const { count, error: countError } = await supabase
        .from('resources')
        .select('*', { count: 'exact', head: true })
        .eq('featured_link', true)
        .neq('id', id);
      if (countError) throw countError;
      if ((count || 0) >= 5) {
        return NextResponse.json({ success: false, error: 'Only five quick-reference links can be designated.' }, { status: 400 });
      }
    }

    const { data, error } = await supabase.from('resources').update(updates).eq('id', id).select().single();
    if (error) throw error;
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('API Update Resource Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(_request, { params }) {
  try {
    if (!isConfigured()) {
      return NextResponse.json({ success: false, error: 'Supabase not configured' }, { status: 400 });
    }
    const { id } = await params;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    const { error } = await supabase.from('resources').delete().eq('id', id);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API Delete Resource Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
