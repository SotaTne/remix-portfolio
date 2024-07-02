import { AppLoadContext } from '@remix-run/cloudflare';
import { contactEmail } from './contactEmail';

export default async function emailContact(
  data: {
    name: string;
    email: string;
    contents: string;
    uuid: string;
    ip: string;
  },
  req: Request,
  context: AppLoadContext,
): Promise<{ return_success: boolean }> {
  try {
    const { success } = await contactEmail(data, req, context);
    return { return_success: success };
  } catch (error) {
    console.error('Error sending contact form:', error);
    return { return_success: false };
  }
}
