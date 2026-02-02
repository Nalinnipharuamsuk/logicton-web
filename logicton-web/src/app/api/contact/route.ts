import { NextResponse } from 'next/server';
import { contactPayloadSchema } from '@/lib/validation';
import { generateId } from '@/lib/content';
import { sendNotification, generateContactMessageText, generateContactEmailHTML } from '@/lib/notifications';
import { saveContactInquiry } from '@/lib/contact-inquiries';
import type { ApiResponse, ContactInquiry } from '@/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate payload
    const validationResult = contactPayloadSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'Invalid form data', message: 'Please check your input fields' },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Create contact inquiry record
    const inquiry: ContactInquiry = {
      id: generateId('inquiry'),
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      subject: data.subject,
      message: data.message,
      language: data.language,
      submittedAt: new Date().toISOString(),
      status: 'new',
      ipAddress: request.headers.get('x-forwarded-for') ||
                  request.headers.get('x-real-ip') ||
                  'unknown'
    };

    // Save inquiry to storage
    await saveContactInquiry(inquiry);

    // Generate email content
    const emailHTML = generateContactEmailHTML({
      name: inquiry.name,
      email: inquiry.email,
      phone: inquiry.phone,
      company: inquiry.company,
      subject: inquiry.subject,
      message: inquiry.message,
      language: inquiry.language,
    });

    const emailText = generateContactMessageText({
      name: inquiry.name,
      email: inquiry.email,
      phone: inquiry.phone,
      company: inquiry.company,
      subject: inquiry.subject,
      message: inquiry.message,
      language: inquiry.language,
    });

    // Send email and LINE notifications simultaneously
    const [emailResult, lineResult] = await Promise.all([
      // Email notification
      sendNotification({
        type: 'email',
        to: process.env.EMAIL_TO || 'din254339@gmail.com',
        subject: `${inquiry.language === 'th' ? 'ข้อความใหม่จากฟอร์มติดตอ' : 'New Contact Form Message'}: ${inquiry.subject}`,
        html: emailHTML,
        text: emailText,
      }),
      // LINE notification
      sendNotification({
        type: 'line',
        message: emailText,
      }),
    ]);

    // Log results (don't fail the request if notifications fail)
    if (!emailResult.success) {
      console.error('Failed to send email notification:', emailResult.error);
    }
    if (!lineResult.success) {
      console.error('Failed to send LINE notification:', lineResult.error);
    }

    return NextResponse.json<ApiResponse>({
      success: true,
      message: 'Contact form submitted successfully',
      data: { id: inquiry.id }
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json<ApiResponse>(
      { success: false, error: 'Failed to submit contact form' },
      { status: 500 }
    );
  }
}
