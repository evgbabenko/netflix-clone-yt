import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import useAuth from '../hooks/useAuth';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { ads_plans } from '../constants/plans';
import { Product } from '@stripe/firestore-stripe-payments';
import Table from './Table';
import { useState } from 'react';
import Loader from './Loader';
import { loadCheckout } from '../lib/stripe';

interface Props{
  plans: Product[],
  
}

const Plans = ( {plans} : Props) => {
  const { logout, user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<Product | null>(plans[2]);
  const [isBillingLoading, setIsBillingLoading] = useState(false);

  const subscribeToPlan = () => {
    if (!user) return

    loadCheckout(selectedPlan?.prices[0].id!)
    setIsBillingLoading(true);

  }

  return (
    <div>
      <Head>
        <title>Plans - Moovie</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <header className='border-b border-white/10 bg-[var(--main-bg-color)]'>
        <Link href='/'>
          <Image
            src={require('../assets/logo.png')}
            alt=''
            width={90}
            height={90}
            className='cursor-pointer object-contain'
          />
        </Link>
        <button
          className='text-md font-medium hover:underline'
          onClick={logout}
        >
          Вийти
        </button>
      </header>

      <main className='mx-auto max-w-5xl px-5 pt-28 pb-12 transition-all md:px-10'>
        <h1 className='mb-3 text-xl font-medium'>Оберіть варіант підписки</h1>

        <ul>
          {ads_plans.map((ads, index) => (
            <li
              className='flex items-center px-0 gap-x-2 text-md'
              key={`${ads.id}-${index * 40}`}
            >
              <DoneAllIcon
                fontSize='small'
                className='text-[var(--color-red)]'
              />
              {ads.label}
            </li>
          ))}
        </ul>

        <div className='mt-4 flex flex-col space-y-4'>
          <div className='flex w-full items-center justify-end self-end md:w-3/5'>
            {plans.map((plan) => (
              <div
                className={`planBox ${selectedPlan?.id === plan.id ? 'opacity-100' : 'opacity-60'
                  }`}
                key={plan.id}
                 onClick={() => setSelectedPlan(plan)} 
              >
                {plan.name}
              </div>
            ))}
          </div>

          <Table plans={plans} selectedPlan={selectedPlan}  />

          { <button
              disabled={!selectedPlan || isBillingLoading}  
            className={`mx-auto w-11/12 rounded bg-[var(--color-red)] py-4 text-xl shadow hover:bg-[#f6121d] md:w-[420px] ${isBillingLoading && 'opacity-60'}`}
             onClick={subscribeToPlan} 
          >
             {isBillingLoading ? (
              <Loader />
            ) : ( 
              'Підключити'
             )} 
          </button> }
        </div>
      </main>
    </div>
  );
};

export default Plans;
