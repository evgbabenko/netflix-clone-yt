import {
  Subscription,
  onCurrentUserSubscriptionUpdate,
} from '@stripe/firestore-stripe-payments';
import { User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import payments from '../lib/stripe';


/* listen subscription update*/
const useSubscription = (user: User | null) => {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  useEffect(() => {
    // if no user - return
    if (!user) return

    /* chech subscription event status, plan */
    onCurrentUserSubscriptionUpdate(payments, (snapshot) => {
      setSubscription(
        snapshot.subscriptions.filter(
          (subscription) =>
            subscription.status === 'active' ||
            subscription.status === 'trialing'
        )[0]
      );
    })
  }, [user]);
  return subscription
}

export default useSubscription;
