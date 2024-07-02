import { useState } from 'react';

import { Link } from '@remix-run/react';
import Menu from '~/components/images/Menu';
import My_Logo from './images/My_Logo';

type NavItem = { text: string; link: string };

const HeaderNavTextList: NavItem[] = [
  { text: 'Works', link: '/works' },
  { text: 'contact', link: '/contact' },
  { text: 'blog', link: '/blog' },
  { text: 'skills', link: '/skills' },
];

const navContents: JSX.Element[] = HeaderNavTextList.map((value, index) => (
  <li key={index} role="none">
    <Link to={value.link} aria-label={value.text} role="menuitem" className="hover:text-purple-500">
      {value.text}
    </Link>
  </li>
));

export default function Header() {
  const [openSide, setOpenSide] = useState(false);
  const [pathName, setPathName] = useState('/');

  const navPhoneContents = HeaderNavTextList.map((value, index) => (
    <li key={index} role="none" className="flex  w-5/6 flex-col pb-10">
      <Link
        to={value.link}
        onClick={() => setOpenSide(false)}
        aria-label={value.text}
        role="menuitem"
        className={`text-center ${pathName === value.link ? 'font-medium text-gray-400' : 'font-medium text-black hover:text-purple-500'}`}
      >
        {value.text}
      </Link>
    </li>
  ));

  function openMenu() {
    setOpenSide((value) => !value);
    setPathName(window.location.pathname);
  }
  return (
    <header
      className="fixed inset-x-0 top-0 h-[86px] items-center justify-center bg-white/95 font-medium"
      role="banner"
    >
      <div className="flex w-full flex-row px-20 py-6">
        <Link to="/" className=" flex items-center justify-center">
          <My_Logo size={45} priority={true} />
        </Link>
        <div className="ml-auto flex flex-row space-x-10">
          <nav className="hidden items-center text-base md:flex" role="navigation">
            <ul className="flex flex-row space-x-10" role="menu">
              {navContents}
            </ul>
          </nav>
        </div>
        <div className="ml-auto md:hidden">
          <button onClick={openMenu}>
            <Menu size={36} />
          </button>
        </div>
      </div>
      <div
        className={`absolute inset-0 h-dvh w-screen bg-white md:hidden ${openSide ? '' : 'hidden'}`}
        role="dialog"
      >
        <div className="flex w-screen px-20 py-6">
          <Link
            to="/"
            onClick={() => setOpenSide(false)}
            className=" flex items-center justify-center"
          >
            <My_Logo size={45} priority={true} />
          </Link>
          <div className="ml-auto">
            <button onClick={openMenu}>
              <Menu size={36} />
            </button>
          </div>
        </div>
        <div className="pt-10">
          <nav className="items-center text-[26px]" role="navigation">
            <ul className="flex flex-col items-center" role="menu">
              {navPhoneContents}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
