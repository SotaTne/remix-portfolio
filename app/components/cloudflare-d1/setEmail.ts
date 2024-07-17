import { AppLoadContext } from '@remix-run/cloudflare';
import { isIpAddress, validateEmail, validateUUID } from '../funcs/matcher';
import { SetDataResponse } from '../types/contactTypes';
import getDB from './base';

const setEmailData = async (
  name: string,
  email: string,
  contents: string,
  uuid: string,
  ip: string,
  context: AppLoadContext,
): Promise<SetDataResponse> => {
  const db = await getDB(context);

  try {
    // Input validation
    if (!name || !email || !contents || !uuid || !ip) {
      return { success: false, message: 'All fields are required' };
    }

    if (name.length == 0 || name.length > 64) {
      return { success: false, message: 'name length not ok' };
    }
    if (contents.length == 0 || contents.length > 4096) {
      return { success: false, message: 'contents length not ok' };
    }
    if (!validateEmail(email)) {
      // Simple email validation
      return { success: false, message: 'Invalid email address' };
    }

    // Simple IP validation
    if (!isIpAddress(ip)) {
      return { success: false, message: 'Invalid IP address' };
    }

    if (!validateUUID(uuid)) {
      return { success: false, message: 'Invalid UUID' };
    }

    // SQLクエリを準備
    const query = `
      INSERT INTO email (uuid, name, email, contents, IP)
      VALUES (?, ?, ?, ?, ?)
      ON CONFLICT(uuid) DO UPDATE SET
        name = excluded.name,
        email = excluded.email,
        contents = excluded.contents,
        IP = excluded.IP;
    `;

    // クエリを実行
    const result = await db.prepare(query).bind(uuid, name, email, contents, ip).run();

    if (result.success) {
      return { success: true, message: 'Email data set successfully' };
    } else {
      return { success: false, message: 'Failed to set email data' };
    }
  } catch (error: unknown) {
    console.error(
      'Error setting email data:',
      error instanceof Error ? error.message : 'Unknown error',
    );
    return { success: false, message: 'An unexpected error occurred' };
  }
};

export default setEmailData;
