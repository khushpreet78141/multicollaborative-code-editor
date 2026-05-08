import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
export default async function contactUsService(name,email,data){
        const response = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: 'khushpreetkaur78141@gmail.com',
    subject: 'New Contact Form Message',
    html: `<h1>New Message</h1>
            <p><strong>Name:</strong>${name}</p>
            <p><strong>Email:</strong>${email}</p>
            <p><strong>Message:</strong>${data}</p>`,
  });

  return response;

}

