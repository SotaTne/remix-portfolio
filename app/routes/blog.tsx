import type { LinksFunction, MetaFunction } from '@remix-run/cloudflare';

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

export default function Index() {
  return (
    <main>
      <section className="mx-auto flex h-screen w-4/5 flex-col content-center items-center justify-center pt-[86px] md:flex-row md:justify-around">
        <h1 className="text-4xl">Coming Soon ...</h1>
      </section>
    </main>
  );
}
