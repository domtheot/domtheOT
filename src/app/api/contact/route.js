import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { sendClientConfirmationEmail, sendAdminNotificationEmail } from '@/lib/email';

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

    // Insert to database if configured
    let dbSuccess = false;
    let dbError = null;
    let newInquiryId = null;

    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const { data, error } = await supabaseAdmin
        .from('inquiries')
        .insert([inquiryData])
        .select('id')
        .single();

      if (error) {
        dbError = error.message;
        console.error('Database insertion failed:', error);
      } else {
        dbSuccess = true;
        newInquiryId = data.id;
      }
    } else {
      console.warn('Supabase env variables missing. Skipping database save.');
    }

    // Send email notifications
    const clientData = { firstName, lastName, email, phone, service, message, source };
    await sendClientConfirmationEmail(clientData);
    await sendAdminNotificationEmail(clientData);

    return NextResponse.json({
      success: true,
      message: 'Inquiry received successfully',
      inquiryId: newInquiryId,
      dbSaved: dbSuccess,
      dbError,
    }, { status: 200 });

  } catch (error) {
    console.error('Inquiry API Error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
