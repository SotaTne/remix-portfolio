import { LinksFunction } from '@remix-run/cloudflare';
import { Link, MetaFunction } from '@remix-run/react';

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

export default function ContactSuccess() {
  return (
    <main className="mx-auto flex h-screen w-full flex-col content-center items-center justify-center bg-white pt-[86px] md:flex-row md:justify-around">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-800">お問い合わせありがとうございます</h1>
        <p className="mb-6 text-2xl text-gray-600">メッセージを受け付けました！</p>
        <Link
          to="/"
          className="inline-block rounded px-6 text-xl transition duration-300 hover:text-purple-500"
        >
          ホームに戻る
        </Link>
      </div>
    </main>
  );
}
