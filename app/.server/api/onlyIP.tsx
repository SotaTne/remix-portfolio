import { json, LoaderFunctionArgs } from '@remix-run/node';
import getClientIp from '~/components/node_funcs/GetClientIP';

export async function loader({ request }: LoaderFunctionArgs) {
  let returnJson = { success: false, clientIp: '' };
  const referer = request.headers.get('referer');
  let origin = request.headers.get('origin');
  let isRefererValid = false;

  // Originがnullの場合、refererから取得
  if (origin === null && referer !== null) {
    try {
      const refererUrl = new URL(referer);
      origin = refererUrl.origin;
    } catch (error) {
      console.error('Error parsing referer URL:', error);
    }
  }

  if (isRefererValid) {
    // クライアントのIPアドレスを取得
    const clientIp = getClientIp(request);

    // レスポンスを返す
    if (clientIp != null) {
      returnJson = { success: true, clientIp };
    } else {
      // クライアントのIPアドレスが取得できない場合はエラーログを記録
      console.error('Unable to determine client IP address:', {
        headers: request.headers,
        ip: 'has no IP',
      });
      returnJson = { success: false, clientIp: 'Not Found' };
    }
  }

  // json関数を使ってJSONレスポンスを返す
  return json(returnJson);
}
