// Email Helper using Resend API

export async function sendClientConfirmationEmail(clientData) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('Resend API key is missing. Skipping client confirmation email.');
    return { success: true, message: 'Mock email sent (development)' };
  }

  const { firstName, email } = clientData;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: 'Dom the OT <hello@domtheot.com>',
        to: [email],
        subject: 'Thank you for reaching out to Dom the OT',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #2D2926; background-color: #FEFCF9; border-radius: 16px; border: 1px solid #E8E0D4;">
            <h2 style="color: #8B9E7C;">Hello ${firstName},</h2>
            <p>Thank you for reaching out to Dom the OT. Your inquiry has been received, and Dominique Alexis will review it and get in touch with you soon.</p>
            <p>If you requested a consultation, Dominique will contact you to confirm a date and time.</p>
            <p>We look forward to connecting with you and supporting your family.</p>
            <br />
            <p>Warmly,</p>
            <p><strong>Dom the OT Team</strong></p>
            <hr style="border: none; border-top: 1px solid #E8E0D4; margin: 20px 0;" />
            <p style="font-size: 12px; color: #6B635B;">Dom the OT LLC · Florida · (786) 390-6614 · DOMTHEOT@GMAIL.COM</p>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Resend API error: ${errorText}`);
    }

    const data = await response.json();
    return { success: true, id: data.id };
  } catch (error) {
    console.error('Failed to send client confirmation email:', error);
    return { success: false, error: error.message };
  }
}

export async function sendAdminNotificationEmail(clientData) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('Resend API key is missing. Skipping admin notification email.');
    return { success: true, message: 'Mock email sent (development)' };
  }

  const { firstName, lastName, email, phone, service, message, source } = clientData;
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || 'DOMTHEOT@GMAIL.COM';

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: 'Dom the OT System <system@domtheot.com>',
        to: [adminEmail],
        subject: `New Inquiry Received: ${firstName} ${lastName} - ${service}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #2D2926; background-color: #FEFCF9; border-radius: 16px; border: 1px solid #E8E0D4;">
            <h2 style="color: #C43072;">New Lead Received</h2>
            <p>A new inquiry form has been submitted on the website.</p>
            <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #E8E0D4; font-weight: bold; width: 150px;">Name:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #E8E0D4;">${firstName} ${lastName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #E8E0D4; font-weight: bold;">Email:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #E8E0D4;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #E8E0D4; font-weight: bold;">Phone:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #E8E0D4;">${phone || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #E8E0D4; font-weight: bold;">Service:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #E8E0D4;">${service}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #E8E0D4; font-weight: bold;">Source:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #E8E0D4;">${source || 'N/A'}</td>
              </tr>
            </table>
            <div style="margin-top: 20px; padding: 15px; background-color: #F5EDE4; border-radius: 8px;">
              <h4 style="margin-top: 0; color: #6B635B;">Client Message:</h4>
              <p style="margin-bottom: 0; line-height: 1.5;">${message}</p>
            </div>
            <p style="margin-top: 25px; text-align: center;">
              <a href="https://domtheot.com/admin/inquiries" style="background-color: #8B9E7C; color: white; padding: 10px 20px; text-decoration: none; border-radius: 8px; font-weight: bold;">View in Admin Dashboard</a>
            </p>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Resend API error: ${errorText}`);
    }

    const data = await response.json();
    return { success: true, id: data.id };
  } catch (error) {
    console.error('Failed to send admin notification email:', error);
    return { success: false, error: error.message };
  }
}
