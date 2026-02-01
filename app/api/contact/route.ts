import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, serviceType, message } = body;

    // Basic validation
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // In a real application, you would:
    // 1. Save to a database (PostgreSQL, MongoDB, etc.)
    // 2. Send email notifications
    // 3. Integrate with CRM system
    
    // For now, we'll just log the submission and return success
    console.log('Contact form submission:', {
      name,
      email,
      phone,
      serviceType,
      message,
      timestamp: new Date().toISOString(),
    });

    // Simulate email sending (in production, use Nodemailer, Resend, etc.)
    const emailContent = `
New Service Request Received:

Name: ${name}
Email: ${email}
Phone: ${phone}
Service Type: ${serviceType || 'Not specified'}

Message:
${message}

Submitted: ${new Date().toLocaleString()}
    `;

    console.log('Email content:', emailContent);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Service request submitted successfully',
        data: {
          name,
          email,
          phone,
          serviceType,
          message,
          submittedAt: new Date().toISOString()
        }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Contact API is running' },
    { status: 200 }
  );
}