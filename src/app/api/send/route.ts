
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.FROM_EMAIL
export async function POST(req : Request) {
  const {body} = await req.json();
  const {email,subject,message}  = body;


  try {
    const data = await resend.emails.send({
      from: fromEmail as string,
      to: ['ayansheikh879@gmail.com' ],
      subject: subject,
      react:`
      <h1>${message}</h1>
      <p>Thank You for contacting us! </p>
      ` ,
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
