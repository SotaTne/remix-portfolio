import { AppLoadContext } from '@remix-run/cloudflare';
import { sendMailToRecipient } from '~/components/brevo/brevoMail';
import getMailData from '../firebase/getMail';

export async function SendEMail(uuid: string, context: AppLoadContext) {
  const data = await getMailData(uuid, context);
  if (!data.success) {
    console.error('Can not send Email');
  }
  const mail = data.data.email;
  const name = data.data.name;
  const contents = data.data.contents;
  const mailContents = {
    email: mail || '',
    name: name || '',
    message: contents || '',
  };
  mailContents;
  await sendMailToRecipient(mailContents, context);
}
