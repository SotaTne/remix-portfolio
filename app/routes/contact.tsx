import {
  ActionFunctionArgs,
  json,
  LinksFunction,
  LoaderFunctionArgs,
  MetaFunction,
  redirect,
} from '@remix-run/cloudflare';
import { Await, Form, useActionData, useLoaderData } from '@remix-run/react';
import { Suspense, useState } from 'react';
import { isIpAddress, validateEmail, validateUUID } from '~/components/funcs/matcher';
import { escapeHTML } from '~/components/funcs/Translator';
import { generateUUIDv4 } from '~/components/funcs/uuid';
import Loading from '~/components/Loading';
import { getOnlyIP } from '~/components/node_funcs/onlyIP';
import searchIP from '~/components/node_funcs/searchIP';
import emailContact from '~/components/node_funcs/sendEmail';
import setIP from '~/components/node_funcs/setIP';

export const meta: MetaFunction = () => {
  return [
    { title: 'Sota Tsunemine Portfolio Site' },
    {
      name: 'description',
      content:
        'SotaTne/常峰蒼太のポートフォリオです。作品やスキル、GithubやXなどのリンクも載せています。',
    },
    {
      name: 'robots',
      content: 'noindex, nofollow',
    },
  ];
};
export const links: LinksFunction = () => {
  return [{ rel: 'icon', href: '/my_logo.svg', type: 'image/svg+xml' }];
};

const inputFields = [
  { type: 'text', name: 'name', placeholder: 'お名前' },
  { type: 'text', name: 'email', placeholder: 'メールアドレス' },
];

type Dict<T> = {
  [key: string]: T;
};

function getDictOrDefault<T>(obj: Dict<T>, key: string, defaultValue: T): T {
  if (key in obj) {
    return obj[key];
  } else {
    return defaultValue;
  }
}

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const UUID = url.searchParams.get('UUID');
  if (UUID != null && UUID.length > 0) {
    const ipResult = await searchIP(request, context);

    if (ipResult.success) {
      return json({ UUID, ip: ipResult.clientIp });
    } else {
      return json({ UUID: 'failed success', ip: '' });
    }
  } else {
    const newUUID = generateUUIDv4();
    const { clientIp, success } = getOnlyIP(request);
    if (success) {
      const data = await setIP(newUUID, clientIp, request, context);
      const success = data.success;
      const ClientIP = data.clientIp;
      if (success) {
        `/contact?UUID=${newUUID}`;
        return redirect(`/contact?UUID=${newUUID}`);
      } else {
        return json({ UUID: 'failed redirect', ip: ClientIP });
      }
    } else {
      return json({ UUID: 'failed has and success', ip: '' });
    }
  }
};

export const action = async ({ request, context }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const name = escapeHTML(formData.get('name') as string);
  const email = escapeHTML(formData.get('email') as string);
  const contents = escapeHTML(formData.get('contents') as string);
  const UUID = escapeHTML(formData.get('UUID') as string);
  const ip = escapeHTML(formData.get('ip') as string);

  const fields = { name, email, contents };
  const fieldErrors = {
    name: name.length > 0 ? (name.length <= 64 ? undefined : '名前が長すぎます') : '名前は必須です',
    email: validateEmail(email)
      ? email.length <= 512
        ? undefined
        : 'メールアドレスが長すぎます'
      : '無効なメールアドレスです',
    contents: contents.length > 0 ? undefined : '内容は必須です',
  };

  if (Object.values(fieldErrors).some(Boolean)) {
    return json({ fieldErrors, fields }, { status: 400 });
  }

  const result = await emailContact({ name, email, contents, uuid: UUID, ip }, request, context);

  if (result.return_success) {
    return redirect('/contact/success');
  } else {
    return redirect('/contact/failure');
  }
};

export default function Index() {
  const { UUID, ip } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const [sending, setSending] = useState(false);
  const baseFieldErrors = actionData?.fieldErrors || { name: '', email: '', contents: '' };
  const fieldErrors: Dict<string> = baseFieldErrors as Dict<string>;
  const baseFields = actionData?.fields || { name: '', email: '', contents: '' };
  const fields: Dict<string> = baseFields as Dict<string>;
  console.log('ip', ip);
  console.log('UUID', UUID);

  return (
    <Suspense fallback={<Loading text="Loading Now" />}>
      <Await resolve={UUID}>
        <section className="mx-auto flex h-screen w-full flex-col content-center items-center justify-center bg-white pt-[86px] md:flex-row md:justify-around">
          {validateUUID(UUID) && isIpAddress(ip) ? (
            <Form
              onSubmit={async () => {
                setSending(true);
              }}
              method="post"
              noValidate
              className="w-full max-w-lg rounded-lg bg-white p-8 shadow-md"
            >
              <input type="hidden" name="UUID" value={UUID} />
              <input type="hidden" name="ip" value={ip} />
              {inputFields.map(({ type, name, placeholder }) => (
                <div key={name} className="mb-4">
                  <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor={name}>
                    {placeholder}
                  </label>
                  <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    defaultValue={getDictOrDefault(fields, name, '')}
                    className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                  />

                  <p className="text-xs italic text-red-500">
                    {getDictOrDefault(fieldErrors, name, '')}
                  </p>
                </div>
              ))}
              <div className="mb-4">
                <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="contents">
                  お問い合わせ内容
                </label>
                <textarea
                  name="contents"
                  placeholder="お問い合わせ内容"
                  rows={5}
                  defaultValue={fields.contents}
                  className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                />
                <p className="text-xs italic text-red-500">{fieldErrors.contents}</p>
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  disabled={sending}
                  className={`focus:shadow-outline rounded ${sending ? 'bg-gray-400' : 'bg-purple-500'} px-4 py-2 font-bold text-white ${sending ? '' : 'hover:bg-purple-700'} focus:outline-none `}
                >
                  送信
                </button>
              </div>
            </Form>
          ) : (
            <Loading text="Loading" />
          )}
        </section>
      </Await>
    </Suspense>
  );
}
