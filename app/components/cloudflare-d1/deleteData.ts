import { AppLoadContext } from '@remix-run/cloudflare';
import { validateUUID } from '../funcs/matcher';
import { DeleteDataResponse } from '../types/contactTypes';
import getDB from './base';

const deleteIpData = async (uuid: string, context: AppLoadContext): Promise<DeleteDataResponse> => {
  const db = await getDB(context);
  try {
    // Input validation
    if (!validateUUID(uuid)) {
      return { success: false, message: 'UUID is required' };
    }
    // Prepare and execute the delete query
    const query = 'DELETE FROM uuidIpMap WHERE uuid = ?';
    const result = await db.prepare(query).bind(uuid).run();

    if (result.meta.changes === 0) {
      return { success: false, message: 'No matching record found to delete' };
    }
    return { success: true, message: 'IP data deleted successfully' };
  } catch (error) {
    console.error(
      `Error deleting IP data with UUID ${uuid}:`,
      error instanceof Error ? error.message : 'Unknown error',
    );
    return { success: false, message: 'An unexpected error occurred while deleting the IP data' };
  }
};

export default deleteIpData;
