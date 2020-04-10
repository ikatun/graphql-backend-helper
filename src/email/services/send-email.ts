import sgMail from '@sendgrid/mail';
import env from 'env-var';

const SENDGRID_API_KEY = env.get('SENDGRID_API_KEY').required(true).asString();
sgMail.setApiKey(SENDGRID_API_KEY);

const EMAIL_FROM = env.get('EMAIL_FROM').required(true).asString();

export async function sendEmail(to: string, subject: string, text: string, from = EMAIL_FROM, html = text) {
  const msg = {
    to, from, subject, text, html,
  };

  return await sgMail.send(msg);
}
