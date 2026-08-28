import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || 'all';
    const service = searchParams.get('service') || 'all';

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    let query = supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    // Filter by status
    if (status !== 'all') {
      query = query.eq('status', status);
    }

    // Filter by service
    if (service !== 'all') {
      query = query.eq('service', service);
    }

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    // Perform manual text search if search query exists
    let filteredData = data;
    if (search) {
      const lowerSearch = search.toLowerCase();
      filteredData = data.filter((inq) => 
        (inq.first_name && inq.first_name.toLowerCase().includes(lowerSearch)) ||
        (inq.last_name && inq.last_name.toLowerCase().includes(lowerSearch)) ||
        (inq.email && inq.email.toLowerCase().includes(lowerSearch)) ||
        (inq.phone && inq.phone.includes(lowerSearch))
      );
    }

    return NextResponse.json({ success: true, data: filteredData }, { status: 200 });

  } catch (error) {
    console.error('API Get Inquiries Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
