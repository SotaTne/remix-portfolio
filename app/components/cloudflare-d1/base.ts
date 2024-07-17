import { AppLoadContext } from '@remix-run/cloudflare';
import { getEnv } from '../node_funcs/getEnv';

export default async function getDB(context: AppLoadContext) {
  const env = await getEnv(context);
  const db = env.DB;
  // await initDB(db);
  return db;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function initDB(db: D1Database) {
  const createUUIDTableQuery = `
    CREATE TABLE IF NOT EXISTS uuidIpMap (
      uuid TEXT PRIMARY KEY,
      IP TEXT NOT NULL
    );
  `;

  const createMailTableQuery = `
    CREATE TABLE IF NOT EXISTS email (
      uuid TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      contents TEXT NOT NULL,
      IP TEXT NOT NULL
    );
  `;

  try {
    await db.prepare(createUUIDTableQuery).run();
    await db.prepare(createMailTableQuery).run();
  } catch (error: unknown) {
    await db.exec('ROLLBACK');
    console.error('Error initializing database:', maskErrorDetails(error));
    throw new Error('Database initialization failed. Please try again later.');
  }
}

// エラーメッセージをマスクする関数
function maskErrorDetails(error: unknown): string {
  if (error instanceof Error) {
    // エラーの詳細を隠し、一般的なメッセージを返す
    return 'An unexpected error occurred';
  }
  return 'Unknown error';
}
