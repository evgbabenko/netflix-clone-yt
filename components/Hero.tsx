import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Movie } from '../typings';
import { baseUrl } from '../constants/movie';
import { HiPlay } from 'react-icons/hi';
import { ImInfo } from 'react-icons/im';

interface Props {
  trendingNow: Movie[];
}

const Hero = ({ trendingNow }: Props) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  useEffect(() => {
    setMovie(trendingNow[Math.floor(Math.random() * trendingNow.length)]);
  }, [trendingNow]);

  return (
    <div className='flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12'>
      <div className='absolute -z-10 top-0 left-0 h-[95vh] w-full'>
        <Image
          src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
          alt=''
          fill
          objectFit='cover'
        />
      </div>
      <div className='text-white'>
        <h1 className='text-2xl lg:text-7xl font-bold md:pb-5 text-shadow-xl'>
          {movie?.title || movie?.original_title || movie?.name}
        </h1>
        <p className='max-w-xs text-xs md:max-w-lg md:text-sm lg:max-w-2xl lg:text-md'>
          {movie?.overview}
        </p>
      </div>
      <div className='flex flex-row space-x-3'>
        <button className='bannerButton bg-white text-black'>
          <HiPlay className='h-4 w-4 text-black md:h-7 md:w-7' />
          Переглянути
        </button>
        <button className='bannerButton bg-[gray]/70'>
          <ImInfo className='h-4 w-4 md:h-6 md:w-6' />
          Докладніше
        </button>
      </div>
    </div>
  );
};
export default Hero;
