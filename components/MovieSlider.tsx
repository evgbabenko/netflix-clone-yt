import { Movie } from '../typings';
import { useRef, useState } from 'react';
import Thumbnail from './Thumbnail';
import { BsChevronDoubleLeft, BsChevronDoubleRight } from 'react-icons/bs';
import { DocumentData } from 'firebase/firestore';

interface Props {
  title: string;
  //When using firebase
  movies: DocumentData[] | Movie[];
}

const MovieSlider = ({ title, movies }: Props) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);

  const handleClick = (direction: string) => {
    setIsMoved(true);

    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current;
      const scrollTo =
        direction === 'left'
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      sliderRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className='h-40 space-y-0.5 md:space-y-2'>
      <h2 className='w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl '>
        {title}
      </h2>
      <div className='group relative md:-ml-2'>
        <BsChevronDoubleLeft
          className={`chevronleft ${!isMoved && 'hidden'}`}
          onClick={() => handleClick('left')}
        />

        <div
          ref={sliderRef}
          className='flex items-center space-x-0.5 overflow-x-scroll  scrollbar-hide md:space-x-2.5 md:p-2'
        >
          {movies.map((movie) => (
            <Thumbnail movie={movie} key={movie.id} />
          ))}
        </div>

        <BsChevronDoubleRight
          className='chevronright'
          onClick={() => handleClick('right')}
        />
      </div>
    </div>
  );
};

export default MovieSlider;
