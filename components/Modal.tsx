import MuiModal from '@mui/material/Modal';
import { modalState, movieState } from '../atoms/modalAtom';
import { useRecoilState } from 'recoil';
import toLang from '../constants/lang';
import { toDate } from '../utils/customFuns';
import { useEffect, useState } from 'react';
import { Element, Genre, Movie } from '../typings';
import ReactPlayer from 'react-player/lazy';
import { youtube_no_thrailer } from '../constants/movie';
//Icons
import CloseIcon from '@mui/icons-material/Close';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import PauseIcon from '@mui/icons-material/Pause';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';

import { DocumentData, collection, deleteDoc, doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import useAuth from '../hooks/useAuth';
import toast, { Toaster } from 'react-hot-toast';

const Modal = () => {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [movie, setMovie] = useRecoilState(movieState);
  const [data, setData] = useState();
  const [trailer, setTrailer] = useState('');
  const [genres, setGenres] = useState<Genre[]>([]);
  const [muted, setMuted] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [addedToList, setAddedToList] = useState(false);
  const { user } = useAuth();
  const [movies, setMovies] = useState<DocumentData[] | Movie[]>([]);

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
      setData(data);

      // if fetch data get trailer or teaser
      if (data?.videos) {
        let index = data.videos.results.findIndex(
          (element: Element) => element.type === 'Trailer'
        );
        // if no trailer, then search teaser
        if (index === -1) {
          if (data?.videos) {
            index = data.videos.results.findIndex(
              (element: Element) => element.type === 'Teaser'
            );
          }
        }
        index === -1
          ? //if no treiler or teaser set 'Comming Soon'
            setTrailer(youtube_no_thrailer)
          : setTrailer(data.videos?.results[index]?.key);
      }

      //if fetch data set genres
      if (data?.genres) {
        setGenres(data.genres);
      }
    }

    fetchMovie();
  }, [movie]);

  // Find all movies in the user list
  useEffect(() => {
    if (user) {
      return onSnapshot(
        collection(db, 'customers', user.uid, 'myList'),
        (snapshot) => setMovies(snapshot.docs)
      );
    }
  }, [db, movie?.id]);

  // Check if the movie is already in the user list
  useEffect(
    () =>
      setAddedToList(
        movies.findIndex((result) => result.data().id === movie?.id) !== -1
      ),
    [movies]
  );

  const handleClose = () => {
    setShowModal(false);
  };

  const handleList = async () => {
    if (addedToList) {
      await deleteDoc(
        doc(db, 'customers', user!.uid, 'myList', movie?.id.toString()!)
      );
      toast.error(
        `${
          movie?.title || movie?.original_title || movie?.name
        } був видалений з вашого списку`,
        {
          duration: 4000,
        }
      );
    } else {
      await setDoc(
        doc(db, 'customers', user!.uid, 'myList', movie?.id.toString()!),
        { ...movie }
      );
      toast.success(
        `${
          movie?.title || movie?.original_title || movie?.name
        } був додано до вашого списку`,
        {
          duration: 4000,
        }
      );
    }
  };

  const handlePlay = () => {
    setPlaying(!playing);
  };
  return (
    <MuiModal
      open={showModal}
      onClose={handleClose}
      className='fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide  ' /* bg-black p-1 */
    >
      <>
        <Toaster position='bottom-center' />
        {/* Close Button */}
        <button
          onClick={handleClose}
          className='modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[var(--modal-bg-color)]'
        >
          <CloseIcon className='h-6 w-6' />
        </button>

        {/* Movie player */}
        <div className='relative pt-[56.25%] overflow-hidden'>
          <ReactPlayer
            url={`https://youtube.com/watch?v=${trailer}`}
            config={{ youtube: { playerVars: { showinfo: 0 } } }}
            width='100%'
            height='100%'
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              background: 'var(--modal-bg-color)',
            }}
            playing={playing}
            muted={muted}
            onEnded={() => setPlaying(false)}
            onPause={() => setPlaying(false)}
            onPlay={() => setPlaying(true)}
          />
          <div className='absolute bottom-10 flex w-full items-center justify-between px-10'>
            <div className='flex space-x-2'>
              <button
                className='flex items-center justify-center gap-x-2 rounded bg-white px-4 sm:px-8 text-xl text-black transition hover:bg-[#e6e6e6] opacity-40 tranform hover:opacity-100 duration-300'
                onClick={handlePlay}
              >
                {playing ? (
                  <>
                    <PauseIcon className='h-7 w-7 text-black' />{' '}
                    <span className='hidden sm:block'>Призупинити</span>
                  </>
                ) : (
                  <>
                    <PlayArrowIcon className='h-7 w-7 text-black' />{' '}
                    <span className='hidden sm:block'>Переглянути</span>
                  </>
                )}
              </button>

              <button
                className='modalButton'
                onClick={handleList}
              >
                {addedToList ? (
                  <PlaylistAddCheckIcon className='h-7 w-7 transition text-red-600' />
                ) : (
                  <AddIcon className='h-7 w-7 transition hover:text-red-600' />
                )}
              </button>

              <button className='modalButton'>
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
        <div className='flex flex-col space-x-16 rounded-b-md bg-[var(--modal-bg-color)] px-5 py-4 md:px-10 md:py-8'>
          <div className='space-y-6 text-lg'>
            <div className='flex items-center space-x-2 text-sm'>
              <p className='font-semibold text-green-400'>
                Збіг{'\u00A0'}
                {Math.round((movie!.vote_average * 100) / 10)}%
              </p>
              <p className='font-light'>
                {toDate(movie?.release_date || movie?.first_air_date)}
              </p>
              <div className='resolution'>HD</div>
            </div>

            {/* movie title */}
            {/*   <div className='font-bold'>
                {movie?.title}
            </div> */}

            {/* Overview */}

            <div className='flex flex-col gap-x-10 gap-y-4 font-light md:flex-row'>
              <p className='w-5/6 text-sm'>{movie?.overview}</p>
              <div className='flex flex-col space-y-3 text-sm'>
                <div>
                  <span className='text-[gray]'>Жарни:{'\u00A0'}</span>
                  {genres.map((genre) => genre.name).join(', ')}
                </div>

                <div>
                  <span className='text-[gray]'>Мова оригіналу:{'\u00A0'}</span>
                  {toLang(movie?.original_language)}
                </div>

                <div>
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
