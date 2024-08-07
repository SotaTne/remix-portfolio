import type { LinksFunction, MetaFunction } from '@remix-run/cloudflare';
import My_Logo from '~/components/images/My_Logo';

export const meta: MetaFunction = () => {
  return [
    { title: 'Sota Tsunemine Portfolio Site' },
    {
      name: 'description',
      content:
        'SotaTne/常峰蒼太のポートフォリオです。作品やスキル、GithubやXなどのリンクも載せています。',
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
        <ul className="flex flex-col md:flex-row">
          <li>
            <My_Logo size={360} />
          </li>
          <li>
            <ul>
              <li>
                <h1 className=" text-6xl">Sota Tsunemine</h1>
              </li>
              <li className="pt-3">
                <p className="text-lg">
                  Webサイトとかプログラミング言語とか作ってます
                  <br />
                  現在は型推論とか仮想domとかについて勉強してます
                </p>
              </li>
            </ul>
          </li>
        </ul>
      </section>
    </main>
  );
}
