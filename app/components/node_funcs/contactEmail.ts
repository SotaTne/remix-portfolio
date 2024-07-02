import { AppLoadContext } from '@remix-run/cloudflare';
import deleteIpData from '~/components/firebase/deleteData';
import searchIpData from '~/components/firebase/search';
import setData from '~/components/firebase/setEmail';
import { isIpAddress, validateEmail, validateUUID } from '~/components/funcs/matcher';
import { escapeHTML } from '~/components/funcs/Translator';
import { SendEMail } from '~/components/node_funcs/Email';
import { isNearPathMatching, isOriginMatching } from './pathMatch';

type ResData = {
  success: boolean;
};

const validateInput = (
  name: string,
  email: string,
  contents: string,
  uuid: string,
  ip: string,
  isRefererValid: boolean,
  searchSuccess: boolean,
  clientIp: string,
): boolean => {
  return (
    typeof name === 'string' &&
    name.trim() !== '' &&
    typeof email === 'string' &&
    validateEmail(email) &&
    typeof contents === 'string' &&
    contents.trim() !== '' &&
    typeof uuid === 'string' &&
    validateUUID(uuid) &&
    typeof ip === 'string' &&
    isIpAddress(ip) &&
    isRefererValid &&
    searchSuccess &&
    clientIp === ip
  );
};

export async function contactEmail(
  data: {
    name: string;
    email: string;
    contents: string;
    uuid: string;
    ip: string;
  },
  req: Request,
  context: AppLoadContext,
): Promise<ResData> {
  const isRefererValid = isOriginMatching(req) && isNearPathMatching(req);

  let returnJson = { success: false };

  try {
    const name = escapeHTML(data.name || '');
    const email = escapeHTML(data.email || '').replace(/\s+/g, '');
    const contents = escapeHTML(data.contents || '');
    const uuid = escapeHTML(data.uuid || '');
    const ip = escapeHTML(data.ip || '');

    const { success: searchSuccess, clientIp } = await searchData(uuid, context);

    if (validateInput(name, email, contents, uuid, ip, isRefererValid, searchSuccess, clientIp)) {
      const deleteResponse = await deleteData(uuid, context);
      if (deleteResponse.success) {
        const setEmailResponse = await setEmail(name, email, contents, uuid, ip, context);
        if (setEmailResponse.success) {
          await SendEMail(uuid, context);
          returnJson = { success: true };
        }
      }
    }
  } catch (error) {
    console.error('Error processing request:', error);
  }

  return returnJson;
}

async function setEmail(
  name: string,
  email: string,
  contents: string,
  uuid: string,
  ip: string,
  context: AppLoadContext,
): Promise<ResData> {
  let returnJson = { success: false };
  try {
    returnJson = await setData(name, email, contents, uuid, ip, context);
  } catch (error) {
    console.error('Error setting email data:', error);
  }
  return returnJson;
}

async function searchData(
  uuid: string,
  context: AppLoadContext,
): Promise<{ success: boolean; clientIp: string }> {
  let returnJson = { success: false, clientIp: '' };
  try {
    returnJson = await searchIpData(uuid, context);
  } catch (error) {
    console.error('Error searching data:', error);
  }
  return returnJson;
}

async function deleteData(uuid: string, context: AppLoadContext): Promise<ResData> {
  let returnJson = { success: false };
  try {
    returnJson = await deleteIpData(uuid, context);
  } catch (error) {
    console.error('Error deleting data:', error);
  }
  return returnJson;
}
