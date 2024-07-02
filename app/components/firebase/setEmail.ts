import { AppLoadContext } from '@remix-run/cloudflare';
import { doc, setDoc } from 'firebase/firestore';
import getDB from './base';

type SetDataResponse = { success: boolean };

const setData = async (
  name: string,
  email: string,
  contents: string,
  uuid: string,
  ip: string,
  context: AppLoadContext,
): Promise<SetDataResponse> => {
  const db = await getDB(context);
  const docRef = doc(db, 'email', uuid);

  try {
    await setDoc(docRef, {
      name,
      email,
      contents,
      ip,
    });
    return { success: true };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error setting document:', error.message);
    } else {
      console.error('Unknown error setting document');
    }
    return { success: false };
  }
};

export default setData;
