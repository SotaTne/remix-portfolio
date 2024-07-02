import { AppLoadContext } from '@remix-run/cloudflare';
import { FirebaseOptions, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getEnv } from '../node_funcs/getEnv';

export default async function getDB(context: AppLoadContext) {
  const env: Env = await getEnv(context);
  const serviceAccountPath = env.WEB_FIREBASE_SERVICE_ACCOUNT;

  try {
    const firebaseSecret: FirebaseOptions = JSON.parse(atob(serviceAccountPath));

    if (!firebaseSecret.apiKey || !firebaseSecret.authDomain || !firebaseSecret.projectId) {
      throw new Error(
        'Firebase構成の必須フィールドが欠けています。apiKey、authDomain、projectIdを確認してください。',
      );
    }

    const app = initializeApp(firebaseSecret);
    const db = getFirestore(app);
    return db;
  } catch (error) {
    throw new Error(
      'FIREBASE_SERVICE_ACCOUNTのデコードまたはパース中にエラーが発生しました: ' +
        (error as Error).message,
    );
  }
}
