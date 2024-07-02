import { AppLoadContext } from '@remix-run/cloudflare';
import { deleteDoc, doc } from 'firebase/firestore';
import getDB from './base';

type DeleteDataResponse = { success: boolean };

const deleteIpData = async (uuid: string, context: AppLoadContext): Promise<DeleteDataResponse> => {
  const db = await getDB(context);
  const ref = doc(db, 'uuidIpMap', uuid);

  try {
    await deleteDoc(ref);
    return { success: true };
  } catch (error) {
    console.error(`Error deleting document with UUID ${uuid}: `, error);
    return { success: false };
  }
};

export default deleteIpData;
