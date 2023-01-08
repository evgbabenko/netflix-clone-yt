import { DocumentData, collection, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Movie } from '../typings';
import { db } from '../firebase';

const userList = (uId: string | undefined) => {
  const [list, setList] = useState<Movie[] | DocumentData>([]);

  useEffect(() => {
    if (!uId) return;

    return onSnapshot(
      collection(db, 'customers', uId, 'myList'),
      (snapshot) => {
        //get data from db
        setList(snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        })));
      }
    )
  }, [db, uId]);

  return list;
};

export default userList;
