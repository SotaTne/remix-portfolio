import { AppLoadContext } from '@remix-run/cloudflare';
import { isIpAddress, validateUUID } from '../funcs/matcher';
import getDB from './base';

type SetDataResponse = { success: boolean; message?: string };

const setData = async (
  uuid: string,
  ip: string,
  context: AppLoadContext,
): Promise<SetDataResponse> => {
  const db = await getDB(context);

  try {
    // Input validation
    if (!uuid || !ip) {
      return { success: false, message: 'UUID and IP are required' };
    }

    // Simple IP validation (you might want to use a more robust method)
    if (!isIpAddress(ip)) {
      return { success: false, message: 'Invalid IP address' };
    }

    if (!validateUUID(uuid)) {
      return { success: false, message: 'Invalid UUID' };
    }

    // uuidIpMap テーブルにデータを挿入または更新
    const result = await db
      .prepare(
        'INSERT INTO uuidIpMap (uuid, IP) VALUES (?, ?) ON CONFLICT(uuid) DO UPDATE SET IP = excluded.IP',
      )
      .bind(uuid, ip)
      .run();

    if (result.success) {
      return { success: true, message: 'Data set successfully' };
    } else {
      return { success: false, message: 'Failed to set data' };
    }
  } catch (error: unknown) {
    console.error(
      'Error setting document:',
      error instanceof Error ? error.message : 'Unknown error',
    );
    return { success: false, message: 'An unexpected error occurred' };
  }
};

export default setData;
