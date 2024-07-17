import { AppLoadContext } from '@remix-run/cloudflare';
import setData from '~/components/cloudflare-d1/setIP';
import { isIpAddress, validateUUID } from '~/components/funcs/matcher';
import getClientIp from '~/components/node_funcs/GetClientIP';
import { isOriginMatching } from './pathMatch';

type SetIPResponse = { success: boolean; clientIp: string };

export default async function setIP(
  UUID: string,
  ip: string,
  request: Request,
  context: AppLoadContext,
): Promise<SetIPResponse> {
  try {
    const clientIp = getClientIp(request) as string;
    if (ip === clientIp && isIpAddress(ip) && validateUUID(UUID) && isOriginMatching(request)) {
      const result = await saveClientIP(UUID, clientIp, context);
      return result;
    } else {
      return { success: false, clientIp: "Don't match ip" };
    }
  } catch (error) {
    logError('Error processing request', error);
    return { success: false, clientIp: 'Internal Server Error' };
  }
}

async function saveClientIP(
  uuid: string,
  ip: string,
  context: AppLoadContext,
): Promise<SetIPResponse> {
  try {
    return { success: (await setData(uuid, ip, context)).success, clientIp: 'ok' };
  } catch (error) {
    logError('Error setting IP', error);
    return { success: false, clientIp: 'Error setting IP' + error };
  }
}

function logError(message: string, error?: unknown) {
  if (error instanceof Error) {
    console.error(`${message}:`, error.message);
  } else {
    console.error(`${message}: Unknown error`);
  }
}
