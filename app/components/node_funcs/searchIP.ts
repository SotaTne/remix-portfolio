import { AppLoadContext } from '@remix-run/cloudflare';
import searchIpData from '~/components/cloudflare-d1/search';
import { isIpAddress, validateUUID } from '~/components/funcs/matcher';
import { isOriginMatching } from './pathMatch';

export default async function searchIP(
  req: Request,
  context: AppLoadContext,
): Promise<{ success: boolean; clientIp: string }> {
  const url = new URL(req.url);
  const UUID = url.searchParams.get('UUID');
  const isRefererValid = isOriginMatching(req);

  let returnJson = { success: false, clientIp: '' };
  if (UUID == null || !isRefererValid || !validateUUID(UUID)) {
    return { success: false, clientIp: 'UUID is missing' };
  }

  try {
    const searchedData = await searchData(UUID, context);
    if (searchedData.success && isIpAddress(searchedData.clientIp)) {
      returnJson = { success: true, clientIp: searchedData.clientIp };
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return { success: false, clientIp: 'Internal Server Error' };
  }

  return returnJson;
}

async function searchData(
  uuid: string,
  context: AppLoadContext,
): Promise<{ success: boolean; clientIp: string }> {
  let returnJson = { success: false, clientIp: '' };
  try {
    returnJson = (await searchIpData(uuid, context)) as {
      success: boolean;
      clientIp: string;
      message?: string;
    };
  } catch (error) {
    console.error('Error fetching data:', error);
  }
  return returnJson;
}
