import Link from 'next/link';
import { navLink } from '../constants/menu';
import { HiOutlineSearch, HiOutlineBell } from 'react-icons/hi';
import { TbFaceId } from 'react-icons/tb';
import { useEffect, useState } from 'react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () =>
      window.scrollY > 0 ? setIsScrolled(true) : setIsScrolled(false);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <header className={`${isScrolled && 'bg-[#141414]/70'} h-[60px]`}>
      <div className='flex items-center space-x-2 md:space-x-10'>
        <img
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1280px-Netflix_2015_logo.svg.png'
          alt=''
          width={100}
          height={100}
          className='cursor-pointer object-contain'
        />
        <ul className='hidden space-x-4 md:flex'>
          {navLink.map((element, index) => (
            <li
              className='headerLink'
              key={`${index * 47}-nav-${element.title}`}
            >
              <Link href={element.navlink}> {element.title}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className='flex items-center space-x-4 text-sm font-light'>
        <HiOutlineSearch className='hidden h-6 w-6 sm:inline ' />
        <p className='hidden lg:inline'>Kids</p>
        <HiOutlineBell className='h-6 w-6' />
        <Link href='/account'>
          <TbFaceId className='h-6 w-6 bg-blue-300 rounded-md' />
        </Link>
      </div>
    </header>
  );
};

export default Header;
