import { LinksFunction, MetaFunction } from '@remix-run/cloudflare';
import React from 'react';

export const meta: MetaFunction = () => {
  return [
    { title: 'Sota Tsunemine Skills' },
    {
      name: 'description',
      content: 'SotaTne/常峰蒼太のそれぞれの言語のスキルについて表示してます',
    },
  ];
};
export const links: LinksFunction = () => {
  return [{ rel: 'icon', href: '/my_logo.svg', type: 'image/svg+xml' }];
};

type Skill = {
  name: string;
  level: number; // 0 to 100
  color: string;
};

const skills: Skill[] = [
  { name: 'JavaScript', level: 80, color: 'bg-yellow-400' },
  { name: 'Python', level: 75, color: 'bg-blue-400' },
  { name: 'AssemblyScript', level: 85, color: 'bg-blue-700' },
  { name: 'TypeScript', level: 75, color: 'bg-blue-500' },
  { name: 'React', level: 75, color: 'bg-cyan-400' },
  { name: 'Remix', level: 55, color: 'bg-purple-600' },
  { name: 'Next', level: 60, color: 'bg-black' },
  { name: 'Docker', level: 70, color: 'bg-sky-600' },
  { name: 'Rust', level: 20, color: 'bg-orange-600' },
  { name: 'Go', level: 40, color: 'bg-cyan-600' },
  { name: 'Node.js', level: 75, color: 'bg-green-600' },
];

const SkillBar: React.FC<Skill> = ({ name, level, color }) => (
  <div className="mb-4">
    <div className="mb-1 flex justify-between">
      <span className="text-base font-medium text-gray-700">{name}</span>
      <span className="text-sm font-medium text-gray-500">{level}%</span>
    </div>
    <div className="h-2.5 w-full rounded-full bg-gray-200">
      <div className={`h-2.5 rounded-full ${color}`} style={{ width: `${level}%` }}></div>
    </div>
  </div>
);

export default function SkillBoard() {
  return (
    <main className="mx-auto mb-6 flex w-full flex-col items-center justify-center bg-white pt-[86px]">
      <section className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-gray-800">My Skills</h2>
        <div className="space-y-6">
          {skills.map((skill) => (
            <SkillBar key={skill.name} {...skill} />
          ))}
        </div>
      </section>
    </main>
  );
}
