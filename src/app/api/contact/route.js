import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      contactMethod,
      service,
      stage,
      dueDate,
      location,
      source,
      message,
      preferredDate,
      consent,
      website, // Honeypot field
    } = body;

    // Honeypot anti-spam check
    if (website) {
      return NextResponse.json({ success: true, message: 'Inquiry processed successfully (spam filter)' }, { status: 200 });
    }

    // Required fields check
    if (!firstName || !lastName || !email || !phone || !service || !message) {
      return NextResponse.json({ success: false, error: 'Required fields are missing' }, { status: 400 });
    }

    // Prepare database insert
    const inquiryData = {
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      preferred_contact: contactMethod,
      service,
      stage,
      due_date: dueDate ? dueDate : null,
      location,
      source,
      message,
      preferred_date: preferredDate,
      consent: !!consent,
      status: 'new',
    };

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !(process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)) {
      return NextResponse.json({ success: false, error: 'Inquiry database is unavailable' }, { status: 503 });
    }

    // Anonymous visitors may insert inquiries through the table's insert-only
    // RLS policy. No email or service-role credential is required.
    const supabase = await createClient();
    const { error } = await supabase.from('inquiries').insert([inquiryData]);
    if (error) throw error;

    return NextResponse.json({
      success: true,
      message: 'Inquiry received successfully',
      dbSaved: true,
    }, { status: 200 });

  } catch (error) {
    console.error('Inquiry API Error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
