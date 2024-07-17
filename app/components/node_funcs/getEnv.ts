// Envは環境変数の型でwrangler typesを実行すると.dev.varsを元に生成される

import { AppLoadContext } from '@remix-run/cloudflare';

export const getEnv = async (context: AppLoadContext) => {
  const env: Env = context.cloudflare.env;
  if (
    !(
      env.BREVO_API_KEY &&
      env.MAIL_APP_PASS &&
      env.RECEIVE_ADDRESS &&
      env.WEB_FIREBASE_SERVICE_ACCOUNT &&
      env.SEND_EMAIL_ADDRESS &&
      env.DB
    )
  ) {
    throw new Error('SUPABASE_URL or SUPABASE_ANON_KEY is not defined');
  }
  return env;
};
