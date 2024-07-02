import { AppLoadContext } from '@remix-run/cloudflare';
import { doc, getDoc } from 'firebase/firestore';
import getDB from './base';

type SearchDataResponse = { success: boolean; data: MainDataType };
type MainDataType = { name: string; email: string; contents: string };

const getMailData = async (uuid: string, context: AppLoadContext): Promise<SearchDataResponse> => {
  const db = await getDB(context);
  const docRef = doc(db, 'email', uuid);

  try {
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return { success: false, data: { name: '', email: '', contents: '' } };
    }

    const data = docSnap.data();

    if (!data || !data.name || !data.email || !data.contents) {
      return { success: false, data: { name: '', email: '', contents: '' } };
    }

    return { success: true, data: { name: data.name, email: data.email, contents: data.contents } };
  } catch (error) {
    console.error('Error getting document: ', error);
    return { success: false, data: { name: '', email: '', contents: '' } };
  }
};

export default getMailData;
