import { AppLoadContext } from '@remix-run/cloudflare';
import { doc, getDoc } from 'firebase/firestore';
import getDB from './base';

type SearchDataResponse = { success: boolean; clientIp: string };

const searchIpData = async (uuid: string, context: AppLoadContext): Promise<SearchDataResponse> => {
  const db = await getDB(context);
  const docRef = doc(db, 'uuidIpMap', uuid);

  try {
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return { success: false, clientIp: '' };
    }

    const data = docSnap.data();

    if (!data || !data.IP) {
      ('Document data is empty or missing IP');
      return { success: false, clientIp: '' };
    }

    return { success: true, clientIp: data.IP as string };
  } catch (error) {
    console.error('Error getting document: ', error);
    return { success: false, clientIp: '' };
  }
};

export default searchIpData;
