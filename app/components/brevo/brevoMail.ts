import { AppLoadContext } from '@remix-run/cloudflare';
import { validateEmail } from '../funcs/matcher';
import { getEnv } from '../node_funcs/getEnv';

export async function sendMailToRecipient(
  response: {
    name: string;
    email: string;
    message: string;
  },
  context: AppLoadContext,
) {
  const env = await getEnv(context);

  const { name, email, message } = response;
  const apiKey = env.BREVO_API_KEY;
  if (!apiKey) {
    throw new Error('BREVO_API_KEY環境変数が設定されていません');
  }
  if (name.length == 0 || name.length > 512) {
    return Response.json({ success: false, message: 'name length not ok' });
  }
  if (message.length == 0 || message.length > 4096) {
    return Response.json({ success: false, message: 'contents length not ok' });
  }
  if (!validateEmail(email)) {
    // Simple email validation
    return Response.json({ success: false, message: 'Invalid email address' });
  }
  const content = {
    sender: {
      name: 'SotaTenPost',
      email: env.SEND_EMAIL_ADDRESS,
    },
    to: [
      {
        email: env.RECEIVE_ADDRESS,
        name: 'SotaTen',
      },
    ],
    textContent: `
      サイトからメッセージが届きました。

      名前: ${name}
      メールアドレス: ${email}
      メッセージ:
      ${message}
    `,
    subject: 'サイトからメッセージが届きました',
  };

  const headers = new Headers({
    'Content-Type': 'application/json',
    'api-key': apiKey,
  });

  const options = {
    method: 'POST',
    headers,
    body: JSON.stringify(content),
  };

  try {
    const mailResponse = await fetch('https://api.sendinblue.com/v3/smtp/email', options);
    if (!mailResponse.ok) {
      throw new Error(`メールの送信中にエラーが発生しました: ${mailResponse.statusText}`);
    }
    return mailResponse;
  } catch (error) {
    console.error('エラー:', error);
    throw error;
  }
}
