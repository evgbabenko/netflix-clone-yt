import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { TbFaceId } from 'react-icons/tb';
import useSubscription from '../hooks/useSubscription';
import useAuth from '../hooks/useAuth';
import { toDate } from '../utils/customFuns';
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined';
import { GetStaticProps } from 'next';
import { Product, getProducts } from '@stripe/firestore-stripe-payments';
import payments, { LoadBillingPortal } from '../lib/stripe';
import { useEffect, useState } from 'react';
import Membership from '../components/Membership';

interface Props {
  plans: Product[];
}

const Account = ({ plans }: Props) => {
  const { user, logout } = useAuth();
  const subscription = useSubscription(user);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isBillingLoading, setIsBillingLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () =>
      window.scrollY > 0 ? setIsScrolled(true) : setIsScrolled(false);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

    const manageSubscription = () => {
      if (subscription) {
        setIsBillingLoading(true);
        LoadBillingPortal();
      }
    };

  return (
    <div>
      <Head>
        <title>Обліковий запис - Moovie</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
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
        </div>

        <div className='flex items-center space-x-4 text-sm font-light'>
          <Link href='/'>
            <TbFaceId className='h-6 w-6 bg-blue-300 rounded-md' />
          </Link>
        </div>
      </header>

      <main className='pt-24 max-w-6xl mx-auto px-5 pb-12 transition-all duration-300 md:px-10'>
        <div className=' flex flex-col gap-x-4 gap-y-3 items-start'>
          <h1 className='text-2xl md:text-3xl'>Обліковий запис</h1>
          <div className='flex items-center gap-x-1.5'>
            <VideoLibraryOutlinedIcon className='text-[var(--color-red)]' />
            <p className='text-xs font-semibold text-[gray]'>
              Підписник із {toDate(subscription?.created!)}
            </p>
          </div>
        </div>

        <Membership />

        {/* Current plan */}
        <div className='accountContainer '>
          <h4 className='text-lg text-[gray]'>Умови плану</h4>
          <div className='col-span-2 font-medium flex items-center gap-x-4'>
            {plans.filter((plan) => plan.id === subscription?.product)[0]?.name}
            <div className='resolution'>
              {
                plans.filter((plan) => plan.id === subscription?.product)[0]
                  ?.metadata.resolution
              }
            </div>
          </div>

          <p
            className='membershipLink md:text-right'
            onClick={manageSubscription}
          >
            Змінити підписку
          </p>
        </div>

        {/* settings */}
        <div className='accountContainer'>
          Налаштування
          <p
            className='col-span-3 md:text-right membershipLink'
            onClick={logout}
          >
            Вихід
          </p>
        </div>
      </main>
    </div>
  );
};

export default Account;

export const getStaticProps: GetStaticProps = async () => {
  const plans = await getProducts(payments, {
    includePrices: true,
    activeOnly: true,
  })
    .then((res) => res)
    .catch((error) => console.log(error.message));

  return {
    props: {
      plans,
    },
  };
};
