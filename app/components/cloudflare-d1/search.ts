import { AppLoadContext } from '@remix-run/cloudflare';
import { isIpAddress, validateUUID } from '../funcs/matcher';
import { SearchDataResponse } from '../types/contactTypes';
import getDB from './base';

const searchIpData = async (uuid: string, context: AppLoadContext): Promise<SearchDataResponse> => {
  const db = await getDB(context);

  try {
    // Input validation
    if (!validateUUID(uuid)) {
      return { success: false, clientIp: null, message: 'UUID is required' };
    }

    // Prepare and execute the query
    const query = 'SELECT IP FROM uuidIpMap WHERE uuid = ?';
    const result = await db.prepare(query).bind(uuid).first<{ IP: string }>();

    if (result == null) {
      return { success: false, clientIp: null, message: 'No matching record found' };
    }

    const clientIp = result.IP;

    if (!isIpAddress(clientIp)) {
      return { success: false, clientIp: null, message: 'IP address is missing in the record' };
    }

    return { success: true, clientIp, message: 'IP address found successfully' };
  } catch (error) {
    console.error(
      'Error searching IP data:',
      error instanceof Error ? error.message : 'Unknown error',
    );
    return { success: false, clientIp: null, message: 'An unexpected error occurred' };
  }
};

export default searchIpData;
