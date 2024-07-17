import { AppLoadContext } from '@remix-run/cloudflare';
import { validateUUID } from '../funcs/matcher';
import { SearchMailDataResponse } from '../types/contactTypes';
import getDB from './base';

const getMailData = async (
  uuid: string,
  context: AppLoadContext,
): Promise<SearchMailDataResponse> => {
  const db = await getDB(context);

  try {
    if (!validateUUID(uuid)) {
      return {
        success: false,
        data: { name: '', email: '', contents: '' },
        message: 'Invalid UUID format',
      };
    }

    const query = 'SELECT name, email, contents FROM email WHERE uuid = ?';
    const result = await db.prepare(query).bind(uuid).first<{
      name: string;
      email: string;
      contents: string;
      IP: string;
    }>();

    if (result == null) {
      return {
        success: false,
        data: { name: '', email: '', contents: '' },
        message: 'No matching record found',
      };
    }

    const { name, email, contents } = result;

    if (!name || !email || !contents) {
      return {
        success: false,
        data: { name: '', email: '', contents: '' },
        message: 'Incomplete data in the record',
      };
    }

    return {
      success: true,
      data: { name, email, contents },
      message: 'Mail data retrieved successfully',
    };
  } catch (error) {
    console.error(
      'Error getting mail data:',
      error instanceof Error ? error.message : 'Unknown error',
    );
    return {
      success: false,
      data: { name: '', email: '', contents: '' },
      message: 'An unexpected error occurred',
    };
  }
};

export default getMailData;
