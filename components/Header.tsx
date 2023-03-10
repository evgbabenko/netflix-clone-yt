import Link from 'next/link';
import { navLink } from '../constants/menu';
import { HiOutlineSearch, HiOutlineBell } from 'react-icons/hi';
import { TbFaceId } from 'react-icons/tb';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import useAuth from '../hooks/useAuth';
import BurgerMenu from './BurgerMenu';


const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
   const { logout } = useAuth();
  useEffect(() => {
    const handleScroll = () =>
      window.scrollY > 0 ? setIsScrolled(true) : setIsScrolled(false);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <header
      className={`${
        isScrolled && 'bg-[var(--main-bg-color-opacity)]'
      } h-[60px]`}
    >
      <div className='flex items-center space-x-2 md:space-x-10'>
        <Link href='/'>
          <Image
            src={require('../assets/logo.png')}
            alt=''
            width={100}
            height={100}
            className='cursor-pointer object-contain'
          />
        </Link>

        <BurgerMenu />

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
        {/* <p className='hidden lg:inline'>Kids</p> */}
        <HiOutlineBell className='h-6 w-6' />
        <Link href='/account'>
          <TbFaceId className='h-6 w-6 bg-blue-300 rounded-md' />
        </Link>
      </div>
    </header>
  );
};

export default Header;
