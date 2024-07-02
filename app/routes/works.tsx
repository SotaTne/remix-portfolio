import type { LinksFunction, MetaFunction } from '@remix-run/cloudflare';
import { Link } from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [
    { title: 'Sota Tsunemine Works' },
    {
      name: 'description',
      content: 'SotaTne/常峰蒼太のそれぞれの作品などについて表示してます',
    },
  ];
};

export const links: LinksFunction = () => {
  return [{ rel: 'icon', href: '/my_logo.svg', type: 'image/svg+xml' }];
};

type projectType = {
  title: string;
  description: string;
  link: string;
};

const projects: projectType[] = [
  {
    title: 'RpakaScript',
    description: 'まだ製作中ですが、WASMが動く環境で動作するインタプリタ言語です',
    link: 'https://github.com/SotaTne/RpakaScript',
  },
  {
    title: '猿でもわかるプログラミング言語',
    description:
      'こちらも執筆中ですが、プログラミング言語を作りながら体系的にわかる記事を書いているところです。今後zennや私のブログにも追加する予定です。',
    link: 'https://github.com/SotaTne/SimplePy/blob/main/LESSON.md',
  },
];

export default function Index() {
  return (
    <main className="mx-auto flex h-screen w-full flex-col content-center items-center justify-center bg-white pt-[86px] md:flex-row md:justify-around">
      <div className="mx-auto max-w-4xl">
        <section className="rounded-lg bg-white p-8 shadow-lg">
          <h1 className="mb-8 text-4xl font-bold text-gray-900">Works</h1>
          <ul className="space-y-8">
            {projects.map((projects, index) => (
              <li
                className="rounded-lg bg-gray-50 p-6 shadow transition hover:shadow-md"
                key={index}
              >
                <Link to={projects.link} className="block">
                  <h2 className="mb-3 text-2xl font-semibold text-indigo-600">{projects.title}</h2>
                  <p className="text-gray-700">{projects.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
