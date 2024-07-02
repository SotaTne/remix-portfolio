import { Link } from '@remix-run/react';
import Github_Logo from '~/components/images/Github_logo';
import X_Logo from '~/components/images/X_logo';
import LinkedIn_Logo from './images/LinkedIn_Logo';
import Mail_Logo from './images/Mail_Logo';
import My_Logo from './images/My_Logo';

type IconItem = {
  altText: string;
  ImgElem: JSX.Element;
  link: string;
};

const FooterIconList = (size?: number, color?: string): IconItem[] => {
  return [
    {
      altText: 'Mail_Logo',
      ImgElem: <Mail_Logo size={'number' === typeof size ? size : 2} color={color} />,
      link: '/contact',
    },
    {
      altText: 'X_Logo',
      ImgElem: <X_Logo size={'number' === typeof size ? size : 24} color={color} />,
      link: 'https://x.com/SotaTne',
    },
    /*
    {
      altText: 'Instagram_Logo',
      ImgElem: <Instagram_Logo size={'number' === typeof size ? size : 24} color={color} />,
      link: '/',
    },
    */
    {
      altText: 'Github_Logo',
      ImgElem: <Github_Logo size={'number' === typeof size ? size : 24} color={color} />,
      link: 'https://github.com/SotaTne',
    },
    {
      altText: 'LinkedIn_Logo',
      ImgElem: <LinkedIn_Logo size={'number' === typeof size ? size : 24} color={color} />,
      link: 'https://www.linkedin.com/in/%E8%92%BC%E5%A4%AA-%E5%B8%B8%E5%B3%B0-88a476316/',
    },
  ];
};

const IconContents: JSX.Element[] = FooterIconList(26, '#4B5563').map((value, index) => (
  <li key={index} className="mx-2">
    <Link to={value.link} aria-label={value.altText}>
      {value.ImgElem}
    </Link>
  </li>
));

export default function Footer() {
  return (
    <footer className="bg-gray-100 pt-12">
      <div className="mx-auto px-4">
        <div className="flex flex-col justify-between">
          <div className="flex flex-wrap justify-center py-6">
            <div className="flex flex-1 items-center justify-center ">
              <Link to="/">
                <My_Logo size={45} />
              </Link>
            </div>
            <nav className="flex flex-1 items-center justify-center">
              <ul className="flex">
                <ul className="flex">{IconContents}</ul>
              </ul>
            </nav>
          </div>
        </div>
        <hr className="mx-auto my-1 h-0.5 w-2/3  bg-gray-300" />
        <div className="py-6 text-center text-gray-500">
          <p>&copy; 2024 Sota Tsunemine</p>
        </div>
      </div>
    </footer>
  );
}
