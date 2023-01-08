import { useState } from 'react';
import useSubscription from '../hooks/useSubscription';
import Loader from './Loader';
import useAuth from '../hooks/useAuth';
import { LoadBillingPortal } from '../lib/stripe';
import { toDate } from '../utils/customFuns';

const Membership = () => {
  const { user } = useAuth();
  const subscription = useSubscription(user);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isBillingLoading, setIsBillingLoading] = useState(false);

  const manageSubscription = () => {
    if (subscription) {
      setIsBillingLoading(true);
      LoadBillingPortal();
    }
  };

  return (
    <div className='accountContainer'>
      <div className='space-y-2 pb-2'>
        <h4 className='text-lg text-[gray]'>Підписка й оплата</h4>
        <button
          disabled={
            isDisabled || !subscription
          }
          className='h-10 w-3/5 whitespace-nowrap bg-slate-400 py-2 text-sm font-medium text-black shadow-md hover:bg-slate-200 md:w-4/5'
          onClick={manageSubscription}
        >
          {isBillingLoading ? <Loader />
            : (subscription?.cancel_at_period_end)
            ? 'Поновити підписку' :
             'Скасувати підписку' 
            }
        </button>
      </div>

      <div className='col-span-3'>
        <div className='flex flex-col justify-between border-b border-white/10 py-4 md:flex-row'>
          <div>
            <p className='text-medium'>{user?.email}</p>
            <p className='text-[gray]'>Пароль: ********</p>
            <p className='text-[gray]'>Телефон: +380 67 000 0000</p>
          </div>

          <div className='md:text-right'>
            <p className='membershipLink'>Змінити адресу електронної пошти</p>
            <p className='membershipLink'>Змінити пароль</p>
            <p className='membershipLink'>Змінити номер телефону</p>
          </div>
        </div>

        <div className=' flex flex-col justify-between pt-4 pb-4 md:flex-row md:pb-0'>
          <div>
            <p>
              {subscription?.cancel_at_period_end
                ? 'Підписку буде скасовано '
                : 'Наступна оплата за підписку '}
              {toDate(subscription?.current_period_end!)}
            </p>
          </div>
          <div className='md:text-right'>
            <p className='membershipLink'>Керування платіжними даними</p>
            <p className='membershipLink'>Додати резервний спосіб оплати</p>
            <p className='membershipLink'>Платіжні дані</p>
            <p className='membershipLink'>Змінити день оплати</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Membership;
