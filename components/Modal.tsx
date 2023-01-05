import MuiModal from '@mui/material/Modal';
import { modalState, movieState } from '../atoms/modalAtom';
import { useRecoilState } from 'recoil';
import { langs } from '../constants/lang';

import { useEffect, useState } from 'react';
import { Element, Genre, Movie } from '../typings';
import ReactPlayer from 'react-player/lazy';

//Icons
import CloseIcon from '@mui/icons-material/Close';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

const Modal = () => {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [movie, setMovie] = useRecoilState(movieState);
  const [data, setData] = useState();
  const [trailer, setTrailer] = useState('');
  const [genres, setGenres] = useState<Genre[]>([]);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    if (!movie) return;

    async function fetchMovie() {
      let data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === 'tv' ? 'tv' : 'movie'
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=uk&append_to_response=videos`
      )
        .then((response) => response.json())
        .catch((error) => console.log(error.message));

      // if no Ukrainian trailer, try get Endlish vercion trailer
      if (data?.videos.results.length === 0)
        data = await fetch(
          `https://api.themoviedb.org/3/${
            movie?.media_type === 'tv' ? 'tv' : 'movie'
          }/${movie?.id}?api_key=${
            process.env.NEXT_PUBLIC_API_KEY
          }&language=en-US&append_to_response=videos`
        )
          .then((response) => response.json())
          .catch((error) => console.log(error.message));
      console.log(data);
      setData(data);

      // if fetch data get trailer or teaser
      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element: Element) => element.type === 'Trailer' || 'Teaser'
        );

        setTrailer(data.videos?.results[index]?.key);
      }

      //if fetch data set genres
      if (data?.genres) {
        setGenres(data.genres);
      }
    }

    fetchMovie();
  }, [movie]);

  const handleClose = () => {
    setShowModal(false);
  };
  return (
    <MuiModal
      open={showModal}
      onClose={handleClose}
      className='fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide ' /* bg-black p-1 */
    >
      <>
        {/* Close Button */}
        <button
          onClick={handleClose}
          className='modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818]'
        >
          <CloseIcon className='h-6 w-6' />
        </button>

        {/* Movie player */}
        <div className='relative pt-[56.25%]'>
          <ReactPlayer
            url={`https://youtube.com/watch?v=${trailer}`}
            width='100%'
            height='100%'
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              background: '#181818',
            }}
            playing
            muted={muted}
          />
          <div className='absolute bottom-10 flex w-full items-center justify-between px-10'>
            <div className='flex space-x-2'>
              <button className='flex items-center justify-center gap-x-2 rounded bg-white px-8 text-xl text-black transition hover:bg-[#e6e6e6]  opacity-40 tranform hover:opacity-100 duration-300'>
                <PlayArrowIcon className='h-7 w-7 text-black' /> Переглянути
              </button>

              <button className='modalButton  opacity-40 tranform hover:opacity-100 duration-300'>
                <AddIcon className='h-7 w-7 transition hover:text-red-600' />
              </button>

              <button className='modalButton  opacity-40 tranform hover:opacity-100 duration-300'>
                <ThumbUpOffAltIcon className='h-7 w-7 transition hover:text-red-600' />
              </button>
            </div>

            <button className='modalButton' onClick={() => setMuted(!muted)}>
              {muted ? (
                <VolumeOffIcon className='h-6 w-6 text-red-600' />
              ) : (
                <VolumeUpIcon className='h-6 w-6' />
              )}
            </button>
          </div>
        </div>
        {/* Bottom section - description, etc.*/}
        <div className='flex flex-col space-x-16 rounded-b-md bg-[#181818] px-10 py-8'>
          <div className='space-y-6 text-lg'>
            <div className='flex items-center space-x-2 text-sm'>
              <p className='font-semibold text-green-400'>
                Збіг{'\u00A0'}
                {movie!.vote_average * 10}%
              </p>
              <p className='font-light'>
                {movie?.release_date || movie?.first_air_date}
              </p>
              <div className='flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-sm'>
                HD
              </div>
            </div>

            {/* Overview */}
            <div className='flex flex-col gap-x-10 gap-y-4 font-light md:flex-row'>
              <p className='w-5/6'>{movie?.overview}</p>
              <div className='flex flex-col space-y-3 text-sm'>
                <div>
                  <span className='text-[gray]'>Жарни:{'\u00A0'}</span>
                  {genres.map((genre) => genre.name).join(', ')}
                </div>

                <div className='flex flex-row space-y-3 text-sm'>
                  <span className='text-[gray]'>
                    Оригінальна мова:{'\u00A0'}
                  </span>
                  {langs[movie?.original_language]}
                </div>

                <div className='flex flex-row space-y-3 text-sm'>
                  <span className='text-[gray]'>Всього голосів:{'\u00A0'}</span>
                  {movie?.vote_count}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </MuiModal>
  );
};

export default Modal;
