import Image from 'next/image';
import { Movie } from '../typings';
import { thumbnailUrl } from '../constants/movie';
import { useRecoilState } from 'recoil';
import { modalState, movieState } from '../atoms/modalAtom';
import { DocumentData } from 'firebase/firestore';

interface Props {
   movie: Movie | DocumentData,
}

const Thumbnail = ({ movie }: Props) => {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);

  return (
    <div
      className='relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105'
      onClick={() => {
        setCurrentMovie(movie);
        setShowModal(true);
      }}
    >
      <Image
        src={`${thumbnailUrl}${movie?.backdrop_path || movie?.poster_path}`}
        alt=''
        fill
        className='rounded-sm object-cover md:rounded'
      />
    </div>
  );
};

export default Thumbnail;
