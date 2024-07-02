import getClientIp from '~/components/node_funcs/GetClientIP';
import { isOriginMatching } from './pathMatch';

export function getOnlyIP(request: Request): {
  success: boolean;
  clientIp: string;
} {
  let returnJson = { success: false, clientIp: '' };
  const isRefererValid = isOriginMatching(request);

  if (isRefererValid) {
    // クライアントのIPアドレスを取得
    const clientIp = getClientIp(request);

    // レスポンスを返す
    if (clientIp != null) {
      returnJson = { success: true, clientIp };
    } else {
      // クライアントのIPアドレスが取得できない場合はエラーログを記録
      console.error('Unable to determine client IP address:', {
        headers: Array.from(request.headers.entries()),
        ip: 'has no IP',
      });
      returnJson = { success: false, clientIp: 'Not Found' };
    }
  }

  return returnJson;
}
