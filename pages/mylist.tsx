import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { TbFaceId } from 'react-icons/tb';
import useSubscription from '../hooks/useSubscription';
import useAuth from '../hooks/useAuth';
import { LoadBillingPortal } from '../lib/stripe';
import { useEffect, useState } from 'react';
import useList from '../hooks/useList';
import MovieSlider from '../components/MovieSlider';
import Header from '../components/Header';
import Thumbnail from '../components/Thumbnail';
import { DocumentData } from 'firebase/firestore';
import { Movie } from '../typings';
import { useRecoilValue } from 'recoil';
import { modalState } from '../atoms/modalAtom';
import Modal from '../components/Modal';

interface Props {
  movies: DocumentData[] | Movie[];
}

const MyList = () => {
  const { user, logout } = useAuth();
  const subscription = useSubscription(user);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () =>
      window.scrollY > 0 ? setIsScrolled(true) : setIsScrolled(false);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const list = useList(user?.uid);
  const showModal = useRecoilValue(modalState);

  return (
    <div>
      <Head>
        <title>Обліковий запис - Moovie</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <main className='relative pl-4 pt-24 lg:space-y-24 lg:pl-16'>
        <section className='md:space-y-24'>
          {list.length > 0 && (
            <div className='flex items-start justify-around md:justify-start gap-4 flex-wrap'>
              {list?.map((movie) => (
                <Thumbnail movie={movie} key={movie.id} />
              ))}
            </div>
          )}
        </section>
      </main>
      {/* Modal */}
      {showModal && <Modal />}
    </div>
  );
};

export default MyList;
