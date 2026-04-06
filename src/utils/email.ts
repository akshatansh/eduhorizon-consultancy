import { Resend } from 'resend';

const resend = new Resend('re_YOUR_API_KEY'); // Replace with your Resend API key

interface EmailData {
  to: string;
  name: string;
  type: 'inquiry' | 'consultation';
  details: Record<string, any>;
}

export const sendEmail = async ({ to, name, type, details }: EmailData) => {
  try {
    let subject = '';
    let content = '';

    if (type === 'inquiry') {
      subject = 'Thank you for your inquiry - EduHorizon';
      content = `
        <h2>Dear ${name},</h2>
        <p>Thank you for your interest in EduHorizon. We have received your inquiry for the ${details.course} course.</p>
        <p>Our team will contact you shortly to discuss your educational journey.</p>
        <p>Your submitted details:</p>
        <ul>
          <li>Name: ${name}</li>
          <li>Email: ${to}</li>
          <li>Phone: ${details.phone}</li>
          <li>Course: ${details.course}</li>
        </ul>
        <p>Best regards,<br>Team EduHorizon</p>
      `;
    } else if (type === 'consultation') {
      subject = 'Consultation Booking Confirmation - EduHorizon';
      content = `
        <h2>Dear ${name},</h2>
        <p>Thank you for booking a consultation with EduHorizon.</p>
        <p>Your consultation details:</p>
        <ul>
          <li>Date: ${details.preferred_date}</li>
          <li>Time: ${details.preferred_time}</li>
          <li>Course: ${details.course}</li>
        </ul>
        <p>Our counselor will contact you to confirm the appointment.</p>
        <p>Best regards,<br>Team EduHorizon</p>
      `;
    }

    await resend.emails.send({
      from: 'EduHorizon <noreply@eduhorizon.com>',
      to: [to],
      subject: subject,
      html: content,
    });

    return { success: true };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error };
  }
};